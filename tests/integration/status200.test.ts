import { expect, test } from '@playwright/test';

test.describe('ページが表示されるかのテスト', () => {
	test('/', async ({ page }) => {
		const response = await page.goto('/');
		expect(response).not.toBe(null);
		if (response === null) return; //静的解析を黙らせるために意味がないがnullチェックをしている
		expect(response.status()).toBe(200);
	});

	test('/works/programming', async ({ page }) => {
		const response = await page.goto('/works/programming');
		expect(response).not.toBe(null);
		if (response === null) return; //静的解析を黙らせるために意味がないがnullチェックをしている
		expect(response.status()).toBe(200);
	});

	test('/works/programming/[id]', async ({ page }) => {
		// うすゆきどっとねっとの作品ページ↓
		const response = await page.goto('/works/programming/0e6a9b0c-33bb-4bbe-a667-ff06399fa818');
		expect(response).not.toBe(null);
		if (response === null) return; //静的解析を黙らせるために意味がないがnullチェックをしている
		expect(response.status()).toBe(200);
	});

	test('/works/videos', async ({ page }) => {
		const response = await page.goto('/works/videos');
		expect(response).not.toBe(null);
		if (response === null) return; //静的解析を黙らせるために意味がないがnullチェックをしている
		expect(response.status()).toBe(200);
	});

	// test('/works/slides', async ({ page }) => {
	// 	const response = await page.goto('/works/slides');
	// 	expect(response).not.toBe(null);
	// 	if (response === null) return; //静的解析を黙らせるために意味がないがnullチェックをしている
	// 	expect(response.status()).toBe(200);
	// });

	test('/techStack', async ({ page }) => {
		const response = await page.goto('/techStack');
		expect(response).not.toBe(null);
		if (response === null) return; //静的解析を黙らせるために意味がないがnullチェックをしている
		expect(response.status()).toBe(200);
	});

	test('/souko', async ({ page }) => {
		const response = await page.goto('/souko');
		expect(response).not.toBe(null);
		if (response === null) return; //静的解析を黙らせるために意味がないがnullチェックをしている
		expect(response.status()).toBe(200);
	});

	test('/oretoku', async ({ page }) => {
		const response = await page.goto('/oretoku');
		expect(response).not.toBe(null);
		if (response === null) return; //静的解析を黙らせるために意味がないがnullチェックをしている
		expect(response.status()).toBe(200);
	});

	test('/links', async ({ page }) => {
		const response = await page.goto('/links');
		expect(response).not.toBe(null);
		if (response === null) return; //静的解析を黙らせるために意味がないがnullチェックをしている
		expect(response.status()).toBe(200);
	});

	test('/kokosuki', async ({ page }) => {
		const response = await page.goto('/kokosuki');
		expect(response).not.toBe(null);
		if (response === null) return; //静的解析を黙らせるために意味がないがnullチェックをしている
		expect(response.status()).toBe(200);
	});

	test('/about', async ({ page }) => {
		const response = await page.goto('/about');
		expect(response).not.toBe(null);
		if (response === null) return; //静的解析を黙らせるために意味がないがnullチェックをしている
		expect(response.status()).toBe(200);
	});
});
