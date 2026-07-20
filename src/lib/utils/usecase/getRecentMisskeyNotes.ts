import type { misskeyContentType } from "$lib/types/misskeyContent";
import {
	fetchRecentNotes,
	misskeyNoteUrl,
	type MisskeyNote,
} from "$lib/utils/adapter/misskeyAdapter";

interface KVCache {
	get(
		key: string,
		options?: { type?: "text" | "json" | "arrayBuffer" | "stream" },
	): Promise<string | null>;
	put(
		key: string,
		value: string | ArrayBuffer | ReadableStream,
		options?: {
			expirationTtl?: number;
			expiration?: number;
			metadata?: object;
		},
	): Promise<void>;
}

// MisskeyのAPIレスポンス形式をトップページ表示用の形式に整形する
export const toMisskeyContent = (note: MisskeyNote): misskeyContentType => {
	return {
		id: note.id,
		text: note.text || "",
		//ISO形式をY-m-dにする
		date: note.createdAt.replace(/-/g, "/").slice(0, 10),
		link: misskeyNoteUrl(note.id),
	};
};

export const getRecentMisskeyNotes = async (
	fetchFn: typeof globalThis.fetch,
	kv?: KVCache,
): Promise<misskeyContentType[]> => {
	const notes = await fetchRecentNotes(fetchFn, kv).catch((err: Error) => {
		console.error(err);
	});
	if (!notes) {
		// Misskeyサーバーの不調でポートフォリオ全体を落としたくないので、空で返してエラーを握りつぶす
		return [];
	}
	return notes.map(toMisskeyContent);
};
