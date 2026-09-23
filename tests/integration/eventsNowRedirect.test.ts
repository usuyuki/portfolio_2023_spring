import { expect, test } from "@playwright/test";

// 飛び先は実行日で変わるためslugは固定せず、着地先が個別ページであることだけを見る
test.describe("/events/nowのリダイレクト", () => {
	test("直近のイベントページへリダイレクトされる", async ({ page }) => {
		const response = await page.goto("/events/now");
		expect(response).not.toBe(null);
		if (response === null) return; //静的解析を黙らせるために意味がないがnullチェックをしている

		expect(response.status()).toBe(200);
		expect(page.url()).toMatch(/\/events\/[^/]+$/);
		expect(page.url()).not.toMatch(/\/events\/now$/);
	});
});
