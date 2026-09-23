import { describe, expect, it } from "vitest";
import type { eventType } from "$lib/types/event";
import { findNearestEvent } from "$lib/utils/usecase/findNearestEvent";

// 検証に関係ないフィールドは固定値でよい
const makeEvent = (
	slug: string,
	startDate: string,
	endDate: string | null = null,
): eventType => ({
	slug,
	name: slug,
	startDate,
	endDate,
	thumbnail: null,
});

const now = new Date("2026-09-23T12:00:00+09:00");

describe("findNearestEvent", () => {
	it("正常系: 未来と過去のイベントがあると、開催日が今日に最も近い1件が前後問わず選ばれる", () => {
		const cases = [
			{
				// 過去3日前 vs 未来10日後 → 距離の近い過去が選ばれる
				events: [
					makeEvent("past3", "2026/09/20"),
					makeEvent("future10", "2026/10/03"),
				],
				expected: "past3",
			},
			{
				// 過去10日前 vs 未来3日後 → 距離の近い未来が選ばれる
				events: [
					makeEvent("past10", "2026/09/13"),
					makeEvent("future3", "2026/09/26"),
				],
				expected: "future3",
			},
			{
				// 開催中のイベントは距離0なので、他に何があっても最優先で選ばれる
				events: [
					makeEvent("ongoing", "2026/09/22", "2026/09/24"),
					makeEvent("tomorrow", "2026/09/24"),
				],
				expected: "ongoing",
			},
			{
				// 当日開催も距離0扱い
				events: [
					makeEvent("today", "2026/09/23"),
					makeEvent("tomorrow", "2026/09/24"),
				],
				expected: "today",
			},
		];
		for (const { events, expected } of cases) {
			expect(
				findNearestEvent(events, now)?.slug,
				`${expected}が選ばれるべき`,
			).toBe(expected);
		}
	});

	it("正常系: 未来と過去が同じ距離のときは、これから開催される方が選ばれる", () => {
		const events = [
			makeEvent("past5", "2026/09/18"),
			makeEvent("future5", "2026/09/28"),
		];
		expect(findNearestEvent(events, now)?.slug).toBe("future5");
	});

	it("正常系: イベントが1件だけなら、過去のものでもそれが選ばれる", () => {
		const events = [makeEvent("onlyPast", "2020/01/01")];
		expect(findNearestEvent(events, now)?.slug).toBe("onlyPast");
	});

	it("異常系: イベントが0件だと、リダイレクト先が決められないのでnullが返る", () => {
		expect(findNearestEvent([], now)).toBe(null);
	});
});
