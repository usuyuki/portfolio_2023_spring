import { expect, test } from '@playwright/test';

test('インデックスページのh1に「うすゆきどっとねっと」が出る', async ({ page }) => {
	await page.goto('/');
	expect(await page.textContent('h1')).toBe('うすゆきどっとねっと');
});
