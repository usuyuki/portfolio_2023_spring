import { expect, test } from "@playwright/test";

// 200が返ることを確認するページの一覧(テーブル駆動)
const pages = [
	"/",
	"/about",
	"/history",
	"/kokosuki",
	"/links",
	"/oretoku",
	"/souko",
	"/techStack",
	"/works/programming",
	// うすゆきどっとねっとの作品ページ↓
	"/works/programming/0e6a9b0c-33bb-4bbe-a667-ff06399fa818",
	"/works/slides",
	"/works/videos",
];

test.describe("ページが表示されるかのテスト", () => {
	for (const path of pages) {
		test(path, async ({ page }) => {
			const response = await page.goto(path);
			expect(response).not.toBe(null);
			if (response === null) return; //静的解析を黙らせるために意味がないがnullチェックをしている
			expect(response.status()).toBe(200);
		});
	}
});
