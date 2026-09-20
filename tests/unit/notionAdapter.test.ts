import { describe, expect, it } from "vitest";
import {
	generateCacheKey,
	isValidDataSourceId,
} from "$lib/utils/adapter/notionAdapter";

// 実在のIDは使わない。判定はdatabaseIdとの一致のみなので値自体に意味はない
const DATABASE_ID = "aaaaaaaabbbbccccddddeeeeeeeeeeee";
const DATABASE_ID_WITH_HYPHENS = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
const DATA_SOURCE_ID = "11111111-2222-3333-4444-555555555555";

describe("isValidDataSourceId", () => {
	const cases: {
		name: string;
		dataSourceId: string;
		databaseId: string;
		expected: boolean;
	}[] = [
		{
			name: "正常系: databaseIdと異なるIDを渡すと、正規のdata_source_idとしてtrueになる",
			dataSourceId: DATA_SOURCE_ID,
			databaseId: DATABASE_ID,
			expected: true,
		},
		{
			name: "異常系: databaseIdとハイフンを除いて一致するIDを渡すと、フォールバック値なのでfalseになる",
			dataSourceId: DATABASE_ID_WITH_HYPHENS,
			databaseId: DATABASE_ID,
			expected: false,
		},
		{
			name: "異常系: databaseIdと完全一致するIDを渡すと、フォールバック値なのでfalseになる",
			dataSourceId: DATABASE_ID,
			databaseId: DATABASE_ID,
			expected: false,
		},
		{
			name: "異常系: 空文字を渡すと、data_source_idが解決できていないのでfalseになる",
			dataSourceId: "",
			databaseId: DATABASE_ID,
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
