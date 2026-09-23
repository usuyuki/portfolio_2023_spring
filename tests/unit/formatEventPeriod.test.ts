import { describe, expect, it } from "vitest";
import { formatEventPeriod } from "$lib/utils/formatEventPeriod";

describe("formatEventPeriod", () => {
	it("正常系: 開催日の組み合わせに応じて、一覧カード向けの期間表記に整形される", () => {
		const cases = [
			// 単日開催はendDateがnullなので開始日だけを出す
			{ start: "2026/12/30", end: null, expected: "2026/12/30" },
			// 複数日開催は範囲で出す
			{
				start: "2026/12/30",
				end: "2026/12/31",
				expected: "2026/12/30 〜 2026/12/31",
			},
			// 開始日と終了日が同じなら実質単日なので、冗長な範囲表記にしない
			{ start: "2026/12/30", end: "2026/12/30", expected: "2026/12/30" },
		];
		for (const { start, end, expected } of cases) {
			expect(formatEventPeriod(start, end)).toBe(expected);
		}
	});
});
