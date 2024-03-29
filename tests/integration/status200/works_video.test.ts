import { expect, test } from '@playwright/test';

test.describe('ページが表示されるかのテスト', () => {
	test('/works/videos', async ({ page }) => {
		const response = await page.goto('/works/videos');
		expect(response).not.toBe(null);
		if (response === null) return; //静的解析を黙らせるために意味がないがnullチェックをしている
		expect(response.status()).toBe(200);
	});
});
