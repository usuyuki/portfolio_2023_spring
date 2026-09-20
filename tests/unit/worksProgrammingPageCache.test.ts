import { describe, expect, it } from "vitest";
import type { WorksProgrammingRow } from "$lib/types/notion";
import { shouldCachePage } from "$lib/utils/adapter/notionAdapter";

// テストで使い回す最小限のNotionページレスポンス。各ケースでisPublishedを上書きする
const rowWith = (isPublished: boolean): WorksProgrammingRow =>
	({
		id: "page-id-1",
		properties: {
			isPublished: { checkbox: isPublished },
		},
	}) as unknown as WorksProgrammingRow;

describe("shouldCachePage", () => {
	const cases: {
		name: string;
		response: unknown;
		expected: boolean;
	}[] = [
		{
			// 公開済みページはKVに載せてよい
			name: "正常系: isPublishedがtrueのページを渡すと、キャッシュ対象としてtrueになる",
			response: rowWith(true),
			expected: true,
		},
		{
			// 非公開ページをキャッシュすると、公開に切り替えてもTTLが切れるまで403が返り続ける
			name: "異常系: isPublishedがfalseのページを渡すと、キャッシュすべきでないのでfalseになる",
			response: rowWith(false),
			expected: false,
		},
		{
			// isPublishedプロパティ自体が無い不正なレスポンスは信用できない
			name: "異常系: isPublishedプロパティが無いレスポンスを渡すと、公開判定できないのでfalseになる",
			response: { id: "page-id-1", properties: {} },
			expected: false,
		},
		{
			// nullやundefinedをキャッシュすると、以降そのページが壊れ続ける
			name: "異常系: nullを渡すと、正常なレスポンスではないのでfalseになる",
			response: null,
			expected: false,
		},
	];

	for (const { name, response, expected } of cases) {
		it(name, () => {
			expect(shouldCachePage(response)).toBe(expected);
		});
	}
});
