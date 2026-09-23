import type { eventType } from "$lib/types/event";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

// WorkersはUTCで動くため、+09:00を明示しないと日付の区切りがJST9時にずれる
export function parseEventDate(date: string): Date {
	const [year, month, day] = date.split("/");
	return new Date(
		`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T00:00:00+09:00`,
	);
}

// 会期中・開催当日を「未来」扱いにするため、最終日の終わり(翌日0時)を境界にする
export function endOfEvent(event: eventType): Date {
	const lastDay = parseEventDate(event.endDate ?? event.startDate);
	return new Date(lastDay.getTime() + ONE_DAY_MS);
}

export function isUpcoming(event: eventType, now: Date): boolean {
	return endOfEvent(event).getTime() > now.getTime();
}
