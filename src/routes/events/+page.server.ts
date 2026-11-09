import { events } from "#lib/data/events.ts";
import { classifyEvents } from "#lib/utils/usecase/classifyEvents.ts";
import type { PageServerLoad } from "./$types";

// コンポーネント内で振り分けるとSSRとハイドレーションで評価時刻が変わり不一致が起きるため、ここで確定させる
export const load = (() => {
	return classifyEvents(events, new Date());
}) satisfies PageServerLoad;
