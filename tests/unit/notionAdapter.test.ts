import { describe, expect, it } from "vitest";
import {
	generateCacheKey,
	isValidDataSourceId,
} from "$lib/utils/adapter/notionAdapter";

describe("isValidDataSourceId", () => {
	const cases: {
		name: string;
		dataSourceId: string;
		databaseId: string;
		expected: boolean;
	}[] = [
		{
			// Notion APIが返す正規のdata_source_idはdatabaseIdと別物なので採用してよい
			name: "正常系: databaseIdと異なるIDを渡すと、正規のdata_source_idとしてtrueになる",
			dataSourceId: "b658391a-d3b5-4962-9715-6451e7fe01c9",
			databaseId: "a0a905a075ae4a83868984c5b53705e8",
			expected: true,
		},
		{
			// ハイフン有無だけが違うdatabaseIdはフォールバック値なのでdata_source_idとして使えない
			name: "異常系: databaseIdとハイフンを除いて一致するIDを渡すと、フォールバック値なのでfalseになる",
			dataSourceId: "a0a905a0-75ae-4a83-8689-84c5b53705e8",
			databaseId: "a0a905a075ae4a83868984c5b53705e8",
			expected: false,
		},
		{
			// databaseIdそのままはdata_sources解決に失敗した時のフォールバック値
			name: "異常系: databaseIdと完全一致するIDを渡すと、フォールバック値なのでfalseになる",
			dataSourceId: "a0a905a075ae4a83868984c5b53705e8",
			databaseId: "a0a905a075ae4a83868984c5b53705e8",
			expected: false,
		},
		{
			// 空文字はdata_sourcesが取得できなかったことを意味する
			name: "異常系: 空文字を渡すと、data_source_idが解決できていないのでfalseになる",
			dataSourceId: "",
			databaseId: "a0a905a075ae4a83868984c5b53705e8",
			expected: false,
		},
	];

	for (const { name, dataSourceId, databaseId, expected } of cases) {
		it(name, () => {
			expect(isValidDataSourceId(dataSourceId, databaseId)).toBe(expected);
		});
	}
});

describe("generateCacheKey", () => {
	it("正常系: filterやsortsを含むパラメータを渡すと、その中身がキーに反映される", () => {
		const key = generateCacheKey("query", {
			databaseId: "db-1",
			filter: { or: [{ property: "isPublished", checkbox: { equals: true } }] },
			sorts: [{ property: "date", direction: "descending" }],
		});
		// btoaでbase64化しているのでデコードして中身を検証する
		const decoded = atob(key.replace("notion:query:", ""));
		expect(decoded).toContain("isPublished");
		expect(decoded).toContain("date");
		expect(decoded).toContain("descending");
	});

	it("異常系: sortsのpropertyだけが異なるパラメータを渡すと、別のキーになる(衝突しない)", () => {
		const base = {
			databaseId: "db-1",
			filter: { or: [{ property: "isPublished", checkbox: { equals: true } }] },
		};
		const keyByDate = generateCacheKey("query", {
			...base,
			sorts: [{ property: "date", direction: "descending" }],
		});
		const keyByUpdatedAt = generateCacheKey("query", {
			...base,
			sorts: [{ property: "updatedAt", direction: "descending" }],
		});
		expect(keyByDate).not.toBe(keyByUpdatedAt);
	});

	it("正常系: キーの順序だけが異なる同内容のパラメータを渡すと、同じキーになる", () => {
		const keyA = generateCacheKey("query", {
			databaseId: "db-1",
			sorts: [{ property: "date", direction: "descending" }],
		});
		const keyB = generateCacheKey("query", {
			sorts: [{ property: "date", direction: "descending" }],
			databaseId: "db-1",
		});
		expect(keyA).toBe(keyB);
	});
});
