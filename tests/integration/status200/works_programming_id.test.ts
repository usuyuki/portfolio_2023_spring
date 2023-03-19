import { expect, test } from '@playwright/test';

test.describe('ページが表示されるかのテスト', () => {
	test('/works/programming/[id]', async ({ page }) => {
		// うすゆきどっとねっとの作品ページ↓
		const response = await page.goto('/works/programming/0e6a9b0c-33bb-4bbe-a667-ff06399fa818');
		expect(response).not.toBe(null);
		if (response === null) return; //静的解析を黙らせるために意味がないがnullチェックをしている
		expect(response.status()).toBe(200);
	});
});
