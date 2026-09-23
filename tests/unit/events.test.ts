import { describe, expect, it } from "vitest";
import { events } from "$lib/data/events";

// リダイレクト専用なのでevents.tsには載らないパス
const RESERVED_SLUGS = new Set(["now"]);

// @types/nodeに依存せず実ファイルを確認するため、fsではなくimport.meta.globを使う
const eventPages = import.meta.glob("../../src/routes/events/*/+page.svelte");
const existingSlugs = new Set(
	Object.keys(eventPages)
		.map((path) => {
			// 末尾から2番目のセグメントが{slug}
			const segments = path.split("/");
			return segments[segments.length - 2];
		})
		.filter((slug) => !RESERVED_SLUGS.has(slug)),
);

// データとディレクトリは別々に手で足すので、片方だけの追加を検出する
describe("events", () => {
	it("正常系: 全てのイベントのslugに対応する詳細ページが存在する", () => {
		for (const event of events) {
			expect(
				existingSlugs.has(event.slug),
				`${event.slug}の詳細ページが無い`,
			).toBe(true);
		}
	});

	it("正常系: 全ての詳細ページがevents.tsに登録されている(登録漏れは一覧に出ない)", () => {
		const registeredSlugs = new Set(events.map((event) => event.slug));
		for (const slug of existingSlugs) {
			expect(
				registeredSlugs.has(slug),
				`${slug}のページがevents.tsに登録されていない`,
			).toBe(true);
		}
	});

	it("異常系: 予約済みのslugをイベントに使うと、そのイベントのページに到達できなくなるので使われていない", () => {
		for (const event of events) {
			expect(
				RESERVED_SLUGS.has(event.slug),
				`${event.slug}は機能用に予約されているのでイベントには使えない`,
			).toBe(false);
		}
	});

	it("正常系: slugが重複していない(重複するとどちらか一方のページに到達できなくなる)", () => {
		const slugs = events.map((event) => event.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
	});

	it("正常系: 開催日がYYYY/MM/DD形式で、終了日が開始日より前になっていない", () => {
		const datePattern = /^\d{4}\/\d{2}\/\d{2}$/;
		for (const event of events) {
			expect(event.startDate, `${event.slug}の開始日の形式`).toMatch(
				datePattern,
			);
			if (event.endDate !== null) {
				expect(event.endDate, `${event.slug}の終了日の形式`).toMatch(
					datePattern,
				);
				expect(
					new Date(event.endDate).getTime() >=
						new Date(event.startDate).getTime(),
					`${event.slug}の終了日が開始日より前になっている`,
				).toBe(true);
			}
		}
	});
});
