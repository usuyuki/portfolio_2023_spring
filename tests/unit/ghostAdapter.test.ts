import { describe, expect, it } from "vitest";
import { type GhostPost, toBlogContent } from "$lib/utils/adapter/ghostAdapter";

const basePost: GhostPost = {
	title: "テスト記事",
	slug: "test-article",
	created_at: "2026-09-20T05:18:00.000Z",
	feature_image: "https://blogapi.usuyuki.net/content/images/2026/09/test.png",
};

describe("toBlogContent", () => {
	it("正常系: 全フィールドが揃った記事を渡すと、表示用の形式(title/link/date/thumbnail)に整形される", () => {
		const result = toBlogContent(basePost);
		expect(result.title).toBe("テスト記事");
		expect(result.link).toBe("https://blog.usuyuki.net/test-article");
		expect(result.date).toBe("2026/09/20T05:18:00.000Z");
		expect(result.thumbnail).toContain("size/w300");
	});

	const fallbackCases: {
		name: string;
		post: GhostPost;
		expected: { title: string; link: string; date: string; thumbnail: string };
	}[] = [
		{
			name: "異常系: titleがundefinedの記事を渡すと、空文字に変換される",
			post: { ...basePost, title: undefined },
			expected: {
				title: "",
				link: "https://blog.usuyuki.net/test-article",
				date: "2026/09/20T05:18:00.000Z",
				thumbnail: "size/w300",
			},
		},
		{
			name: "異常系: slugがundefinedの記事を渡すと、リンクがブログのルートになる",
			post: { ...basePost, slug: undefined },
			expected: {
				title: "テスト記事",
				link: "https://blog.usuyuki.net/",
				date: "2026/09/20T05:18:00.000Z",
				thumbnail: "size/w300",
			},
		},
		{
			name: "異常系: created_atがundefinedの記事を渡すと、日付が空文字になる",
			post: { ...basePost, created_at: undefined },
			expected: {
				title: "テスト記事",
				link: "https://blog.usuyuki.net/test-article",
				date: "",
				thumbnail: "size/w300",
			},
		},
		{
			name: "異常系: feature_imageがundefinedの記事を渡すと、サムネイルが空文字になる",
			post: { ...basePost, feature_image: undefined },
			expected: {
				title: "テスト記事",
				link: "https://blog.usuyuki.net/test-article",
				date: "2026/09/20T05:18:00.000Z",
				thumbnail: "",
			},
		},
	];

	for (const { name, post, expected } of fallbackCases) {
		it(name, () => {
			const result = toBlogContent(post);
			expect(result.title).toBe(expected.title);
			expect(result.link).toBe(expected.link);
			expect(result.date).toBe(expected.date);
			if (expected.thumbnail === "") {
				expect(result.thumbnail).toBe("");
			} else {
				expect(result.thumbnail).toContain(expected.thumbnail);
			}
		});
	}
});
