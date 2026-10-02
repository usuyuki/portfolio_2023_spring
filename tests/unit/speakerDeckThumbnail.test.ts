import { describe, expect, it } from "vitest";
import { speakerDeckThumbnail } from "$lib/utils/speakerDeckThumbnail";

describe("speakerDeckThumbnail", () => {
	it("正常系: Speaker DeckのプレイヤーURLを渡すと、表紙のサムネイル画像URLになる", () => {
		const cases = [
			{
				url: "https://speakerdeck.com/player/f385cfb9a22647e795bc3b1b6d98f8e2",
				expected:
					"https://files.speakerdeck.com/presentations/f385cfb9a22647e795bc3b1b6d98f8e2/preview_slide_0.jpg",
			},
			// 埋め込みコードからコピーするとクエリが付くことがあるが、IDだけ取り出せる
			{
				url: "https://speakerdeck.com/player/a62e0c41b2934ab9be3e85d00bd0fdc0?slide=3",
				expected:
					"https://files.speakerdeck.com/presentations/a62e0c41b2934ab9be3e85d00bd0fdc0/preview_slide_0.jpg",
			},
		];
		for (const { url, expected } of cases) {
			expect(speakerDeckThumbnail(url), url).toBe(expected);
		}
	});

	it("異常系: プレイヤーURL以外を渡すと、IDを取り出せないのでnullになる", () => {
		const urls = [
			// Notionで未入力のときは空文字になる
			"",
			// スライドページのURLにはIDが含まれない
			"https://speakerdeck.com/usuyuki/some-slide",
			// Speaker Deck以外の埋め込み
			"https://docs.google.com/presentation/d/xxx/embed",
		];
		for (const url of urls) {
			expect(speakerDeckThumbnail(url), url).toBeNull();
		}
	});
});
