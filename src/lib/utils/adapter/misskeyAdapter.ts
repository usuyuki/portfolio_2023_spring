// うすゆきのMisskeyアカウント(m5y.usuyuki.net)の投稿を取得するアダプタ
// ユーザーIDはusernameから毎回引かず固定値を使う(APIリクエスト削減、id自体が変わることはない)
const MISSKEY_HOST = "https://m5y.usuyuki.net";
const MISSKEY_USER_ID = "9504ri5aaf";

// KV Cache interface for Cloudflare Workers
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

export type MisskeyNote = {
	id: string;
	createdAt: string;
	text: string | null;
	cw: string | null;
	visibility: string;
	renoteId: string | null;
	replyId: string | null;
};

const CACHE_KEY = "misskey:notes:usuyuki";
// 数分キャッシュしてMisskeyサーバーへの負荷とKV書き込み回数を抑える
export const MISSKEY_NOTES_CACHE_TTL = 300; // 5分
const MAX_NOTES = 10;

// 公開投稿かつCWなし、リプライ・Renoteでないものだけに絞って最大件数にする
export const filterPublicNotes = (
	notes: MisskeyNote[],
	maxNotes: number = MAX_NOTES,
): MisskeyNote[] => {
	return notes
		.filter(
			(note) =>
				note.visibility === "public" &&
				note.cw === null &&
				note.replyId === null &&
				note.renoteId === null,
		)
		.slice(0, maxNotes);
};

// 公開・通常投稿(CW/リプライ/Renoteなし)のみを直近10件取得する
export const fetchRecentNotes = async (
	fetchFn: typeof globalThis.fetch,
	kv?: KVCache,
): Promise<MisskeyNote[]> => {
	if (kv) {
		try {
			const cached = await kv.get(CACHE_KEY, { type: "json" });
			if (cached) {
				return cached as unknown as MisskeyNote[];
			}
		} catch (error) {
			console.warn(`KV cache read failed for ${CACHE_KEY}:`, error);
		}
	}

	const response = await fetchFn(`${MISSKEY_HOST}/api/users/notes`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			userId: MISSKEY_USER_ID,
			limit: 30,
			withRenotes: false,
			withReplies: false,
		}),
	});

	if (!response.ok) {
		throw new Error(`Misskey API request failed: ${response.status}`);
	}

	const notes = (await response.json()) as MisskeyNote[];
	const filtered = filterPublicNotes(notes);

	if (kv) {
		try {
			await kv.put(CACHE_KEY, JSON.stringify(filtered), {
				expirationTtl: MISSKEY_NOTES_CACHE_TTL,
			});
		} catch (error) {
			console.warn(`KV cache write failed for ${CACHE_KEY}:`, error);
		}
	}

	return filtered;
};

export const misskeyNoteUrl = (noteId: string): string =>
	`${MISSKEY_HOST}/notes/${noteId}`;
