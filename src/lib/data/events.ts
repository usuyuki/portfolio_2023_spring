import type { eventType } from "$lib/types/event";

// 追加時は src/routes/events/{slug}/+page.svelte も作る。"now"はリダイレクト用に予約済み
export const events: eventType[] = [
	{
		slug: "techbookfest21",
		name: "技術書典21",
		// オンライン会期全体。11/23がオフライン開催日
		startDate: "2026/11/21",
		endDate: "2026/12/06",
		thumbnail: null,
	},
];
