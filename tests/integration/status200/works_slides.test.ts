import { expect, test } from '@playwright/test';

test.describe('ページが表示されるかのテスト', () => {
	test('/works/slides', async ({ page }) => {
		const response = await page.goto('/works/slides');
		expect(response).not.toBe(null);
		if (response === null) return; //静的解析を黙らせるために意味がないがnullチェックをしている
		expect(response.status()).toBe(200);
	});
});
