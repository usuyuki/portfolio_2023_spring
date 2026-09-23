import { describe, expect, it } from "vitest";
import type { eventType } from "$lib/types/event";
import { endOfEvent, isUpcoming, parseEventDate } from "$lib/utils/eventDate";

// 検証に関係ないフィールドは固定値でよい
const makeEvent = (
	startDate: string,
	endDate: string | null = null,
): eventType => ({
	slug: "event",
	name: "event",
	startDate,
	endDate,
	thumbnail: null,
});

describe("parseEventDate", () => {
	it("正常系: YYYY/MM/DDを渡すと、実行環境のタイムゾーンに依らずJSTのその日の0時になる", () => {
		const cases = [
			{ date: "2026/09/23", expected: "2026-09-23T00:00:00+09:00" },
			// 月日が1桁でも0埋めして解釈される
			{ date: "2027/1/5", expected: "2027-01-05T00:00:00+09:00" },
		];
		for (const { date, expected } of cases) {
			expect(parseEventDate(date).getTime(), date).toBe(
				new Date(expected).getTime(),
			);
		}
	});
});

describe("endOfEvent", () => {
	it("正常系: イベントを渡すと、最終日の翌日0時(JST)が返る", () => {
		const cases = [
			// endDateがあればその翌日
			{
				event: makeEvent("2026/12/30", "2026/12/31"),
				expected: "2027-01-01T00:00:00+09:00",
			},
			// 単日開催ならstartDateの翌日
			{ event: makeEvent("2026/09/23"), expected: "2026-09-24T00:00:00+09:00" },
		];
		for (const { event, expected } of cases) {
			expect(endOfEvent(event).getTime()).toBe(new Date(expected).getTime());
		}
	});
});

describe("isUpcoming", () => {
	it("正常系: 最終日の終わり(JSTの24時)を境に、未来扱いから過去扱いへ切り替わる", () => {
		const event = makeEvent("2026/12/30", "2026/12/31");
		const cases = [
			// 最終日の23:59(JST)はまだ会期中
			{ now: "2026-12-31T23:59:00+09:00", expected: true },
			// 翌日0時(JST)ちょうどで終了扱い
			{ now: "2027-01-01T00:00:00+09:00", expected: false },
			// UTCではまだ12/31だが、JSTでは翌日なので終了扱い
			{ now: "2027-01-01T08:59:00+09:00", expected: false },
		];
		for (const { now, expected } of cases) {
			expect(isUpcoming(event, new Date(now)), now).toBe(expected);
		}
	});
});
