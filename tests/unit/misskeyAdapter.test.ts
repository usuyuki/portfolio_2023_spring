import { describe, expect, it } from "vitest";
import {
	filterPublicNotes,
	misskeyNoteUrl,
	type MisskeyNote,
} from "$lib/utils/adapter/misskeyAdapter";

const baseNote: MisskeyNote = {
	id: "note1",
	createdAt: "2026-07-20T05:06:09.417Z",
	text: "テスト投稿",
	cw: null,
	visibility: "public",
	renoteId: null,
	replyId: null,
};

describe("filterPublicNotes", () => {
	it("正常系: 公開・通常投稿のみが渡されると、そのまま全件返す", () => {
		const notes = [baseNote, { ...baseNote, id: "note2" }];
		const result = filterPublicNotes(notes);
		expect(result).toHaveLength(2);
	});

	it("正常系: maxNotesを指定すると、その件数までに絞り込まれる", () => {
		const notes = [
			baseNote,
			{ ...baseNote, id: "note2" },
			{ ...baseNote, id: "note3" },
		];
		const result = filterPublicNotes(notes, 2);
		expect(result).toHaveLength(2);
		expect(result.map((n) => n.id)).toEqual(["note1", "note2"]);
	});

	it("異常系: visibilityがpublic以外の投稿が混ざっていると、その投稿は除外される", () => {
		const notes = [baseNote, { ...baseNote, id: "note2", visibility: "home" }];
		const result = filterPublicNotes(notes);
		expect(result.map((n) => n.id)).toEqual(["note1"]);
	});

	it("異常系: cwが設定されている投稿が混ざっていると、その投稿は除外される", () => {
		const notes = [baseNote, { ...baseNote, id: "note2", cw: "閲覧注意" }];
		const result = filterPublicNotes(notes);
		expect(result.map((n) => n.id)).toEqual(["note1"]);
	});

	it("異常系: replyIdが設定されている投稿が混ざっていると、その投稿は除外される", () => {
		const notes = [
			baseNote,
			{ ...baseNote, id: "note2", replyId: "someReplyId" },
		];
		const result = filterPublicNotes(notes);
		expect(result.map((n) => n.id)).toEqual(["note1"]);
	});

	it("異常系: renoteIdが設定されている投稿が混ざっていると、その投稿は除外される", () => {
		const notes = [
			baseNote,
			{ ...baseNote, id: "note2", renoteId: "someRenoteId" },
		];
		const result = filterPublicNotes(notes);
		expect(result.map((n) => n.id)).toEqual(["note1"]);
	});

	it("正常系: 投稿が0件だと、空配列を返す", () => {
		const result = filterPublicNotes([]);
		expect(result).toEqual([]);
	});
});

describe("misskeyNoteUrl", () => {
	it("正常系: noteIdを渡すと、投稿の閲覧URLを組み立てて返す", () => {
		const result = misskeyNoteUrl("abc123");
		expect(result).toBe("https://m5y.usuyuki.net/notes/abc123");
	});
});
