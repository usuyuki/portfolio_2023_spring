import { describe, expect, it } from "vitest";
import type { eventType } from "$lib/types/event";
import { classifyEvents } from "$lib/utils/usecase/classifyEvents";

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

describe("classifyEvents", () => {
	it("正常系: 未来のイベントがあると、最も近い1件がheroになり、残りが開催日の昇順でupcomingに入る", () => {
		const events = [
			makeEvent("far", "2026/12/31"),
			makeEvent("near", "2026/10/01"),
			makeEvent("middle", "2026/11/03"),
		];
		const result = classifyEvents(
			events,
			new Date("2026-09-23T00:00:00+09:00"),
		);
		expect(result.hero?.slug).toBe("near");
		expect(result.upcoming.map((e) => e.slug)).toEqual(["middle", "far"]);
		expect(result.past).toEqual([]);
	});

	it("正常系: 過去のイベントは開催日の降順(新しい順)でpastに入る", () => {
		const events = [
			makeEvent("old", "2025/01/05"),
			makeEvent("recent", "2026/08/15"),
			makeEvent("future", "2026/12/31"),
		];
		const result = classifyEvents(
			events,
			new Date("2026-09-23T00:00:00+09:00"),
		);
		expect(result.hero?.slug).toBe("future");
		expect(result.past.map((e) => e.slug)).toEqual(["recent", "old"]);
	});

	it("正常系: 未来のイベントが1件も無いと、最も新しい過去のイベントがheroになりupcomingは空になる", () => {
		const events = [
			makeEvent("old", "2025/01/05"),
			makeEvent("recent", "2026/08/15"),
		];
		const result = classifyEvents(
			events,
			new Date("2026-09-23T00:00:00+09:00"),
		);
		expect(result.hero?.slug).toBe("recent");
		expect(result.upcoming).toEqual([]);
		expect(result.past.map((e) => e.slug)).toEqual(["old"]);
	});

	it("正常系: イベントが0件だと、heroがnullでupcoming/pastとも空になる(枠ごと非表示にするため)", () => {
		const result = classifyEvents([], new Date("2026-09-23T00:00:00+09:00"));
		expect(result).toEqual({ hero: null, upcoming: [], past: [] });
	});

	it("正常系: 開催期間の判定はendDateの終わりまで行われ、会期中や当日のイベントは未来扱いになる", () => {
		const cases = [
			// 会期中(開始済みだが終了日が未来)なので未来扱い
			{
				event: makeEvent("ongoing", "2026/09/20", "2026/09/25"),
				expected: "upcoming",
			},
			// 単日開催の当日は、その日のうちはまだ終わっていないので未来扱い
			{ event: makeEvent("today", "2026/09/23"), expected: "upcoming" },
			// 終了日が昨日なので過去扱い
			{
				event: makeEvent("justEnded", "2026/09/20", "2026/09/22"),
				expected: "past",
			},
			// 単日開催で昨日なので過去扱い
			{ event: makeEvent("yesterday", "2026/09/22"), expected: "past" },
		];
		const now = new Date("2026-09-23T12:00:00+09:00");
		for (const { event, expected } of cases) {
			const result = classifyEvents([event], now);
			// 1件だけだと必ずheroに入り判定側が見えないため、decoyを足してpastの中身で確認する
			expect(result.hero?.slug, `${event.slug}は${expected}になるべき`).toBe(
				event.slug,
			);
			const withDecoy = classifyEvents(
				[event, makeEvent("decoy", "2030/01/01")],
				now,
			);
			if (expected === "upcoming") {
				expect(
					withDecoy.past,
					`${event.slug}は未来扱いなのでpastに入らない`,
				).toEqual([]);
			} else {
				expect(
					withDecoy.past.map((e) => e.slug),
					`${event.slug}は過去扱いなのでpastに入る`,
				).toEqual([event.slug]);
			}
		}
	});
});
