import type { eventSection, eventType } from "$lib/types/event";
import { isUpcoming, parseEventDate } from "$lib/utils/eventDate";

// heroは未来を優先し、無ければ直近の過去を充てる(/events/nowの「前後問わず最も近い」とは別基準)
export function classifyEvents(events: eventType[], now: Date): eventSection {
	const upcoming = events
		.filter((event) => isUpcoming(event, now))
		.sort(
			(a, b) =>
				parseEventDate(a.startDate).getTime() -
				parseEventDate(b.startDate).getTime(),
		);
	const past = events
		.filter((event) => !isUpcoming(event, now))
		.sort(
			(a, b) =>
				parseEventDate(b.startDate).getTime() -
				parseEventDate(a.startDate).getTime(),
		);

	// heroに使った1件は二重表示を避けるため取り除く
	if (upcoming.length > 0) {
		const [hero, ...rest] = upcoming;
		return { hero, upcoming: rest, past };
	}
	if (past.length > 0) {
		const [hero, ...rest] = past;
		return { hero, upcoming: [], past: rest };
	}
	return { hero: null, upcoming: [], past: [] };
}
