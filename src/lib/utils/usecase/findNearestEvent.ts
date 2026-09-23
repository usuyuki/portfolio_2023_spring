import type { eventType } from "$lib/types/event";
import { endOfEvent, isUpcoming, parseEventDate } from "$lib/utils/eventDate";

// 今日からの距離(ミリ秒)。会期中は0
function distanceFromNow(event: eventType, now: Date): number {
	const start = parseEventDate(event.startDate).getTime();
	if (now.getTime() < start) return start - now.getTime();
	if (!isUpcoming(event, now))
		return now.getTime() - endOfEvent(event).getTime();
	return 0;
}

// 前後問わず今日に最も近い1件。同距離なら未来を優先する
export function findNearestEvent(
	events: eventType[],
	now: Date,
): eventType | null {
	let nearest: eventType | null = null;
	let nearestDistance = Number.POSITIVE_INFINITY;

	for (const event of events) {
		const distance = distanceFromNow(event, now);
		const isCloser = distance < nearestDistance;
		const isTieBrokenByFuture =
			distance === nearestDistance &&
			nearest !== null &&
			!isUpcoming(nearest, now) &&
			isUpcoming(event, now);

		if (isCloser || isTieBrokenByFuture) {
			nearest = event;
			nearestDistance = distance;
		}
	}
	return nearest;
}
