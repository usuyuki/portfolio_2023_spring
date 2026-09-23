// 単日開催は冗長な範囲表記にしない
export function formatEventPeriod(
	startDate: string,
	endDate: string | null,
): string {
	if (endDate === null || endDate === startDate) return startDate;
	return `${startDate} 〜 ${endDate}`;
}
