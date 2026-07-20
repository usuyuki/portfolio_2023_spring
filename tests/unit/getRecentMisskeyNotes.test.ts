import { describe, expect, it } from "vitest";
import type { MisskeyNote } from "$lib/utils/adapter/misskeyAdapter";
import { toMisskeyContent } from "$lib/utils/usecase/getRecentMisskeyNotes";

describe("toMisskeyContent", () => {
	it("正常系: MisskeyのNoteを渡すと、表示用の形式(id/text/date/link)に整形される", () => {
		const note: MisskeyNote = {
			id: "abc123",
			createdAt: "2026-07-20T05:06:09.417Z",
			text: "テスト投稿",
			cw: null,
			visibility: "public",
			renoteId: null,
			replyId: null,
		};
		const result = toMisskeyContent(note);
		expect(result).toEqual({
			id: "abc123",
			text: "テスト投稿",
			date: "2026/07/20",
			link: "https://m5y.usuyuki.net/notes/abc123",
		});
	});

	it("異常系: textがnullの投稿を渡すと、空文字列に変換される", () => {
		const note: MisskeyNote = {
			id: "abc123",
			createdAt: "2026-07-20T05:06:09.417Z",
			text: null,
			cw: null,
			visibility: "public",
			renoteId: null,
			replyId: null,
		};
		const result = toMisskeyContent(note);
		expect(result.text).toBe("");
	});
});
