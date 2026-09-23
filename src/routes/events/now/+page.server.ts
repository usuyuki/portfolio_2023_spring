import { error, redirect } from "@sveltejs/kit";
import { events } from "$lib/data/events";
import { findNearestEvent } from "$lib/utils/usecase/findNearestEvent";
import type { PageServerLoad } from "./$types";

// イベントごとにURLを貼り替えずに済む「今のイベント」への固定リンク
export const load = (async () => {
	const nearest = findNearestEvent(events, new Date());
	if (nearest === null) {
		error(404, "まだイベントの予定がありません。");
	}
	// 飛び先が時期で変わるのでキャッシュされない302にする
	redirect(302, `/events/${nearest.slug}`);
}) satisfies PageServerLoad;
