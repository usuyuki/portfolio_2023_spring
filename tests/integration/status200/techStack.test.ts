import { expect, test } from '@playwright/test';

test.describe('ページが表示されるかのテスト', () => {
	test('/techStack', async ({ page }) => {
		const response = await page.goto('/techStack');
		expect(response).not.toBe(null);
		if (response === null) return; //静的解析を黙らせるために意味がないがnullチェックをしている
		// await page.screenshot({ path: `playwright/images/test.png` ,fullPage:true})
		expect(response.status()).toBe(200);
	});
});
