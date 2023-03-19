import { test } from '@playwright/test';

test.describe('移動しての動作テスト', () => {
	test('らんだむさーふぁー', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('link', { name: 'もっとみる!' }).click();
		await page
			.getByRole('link', {
				name: 'サムネイル ロゴ うすゆきブログV2 新しくなったAstro製うすゆきブログです！'
			})
			.click();
		await page
			.getByRole('link', {
				name: 'サムネイル 6代目ポートフォリオ Svelte製6代目ポートフォリオです！'
			})
			.click();
		await page.getByRole('link', { name: 'うすゆきどっとねっと' }).click();
		await page.getByRole('link', { name: 'スライド' }).click();
		await page.getByRole('banner').click();
		await page.getByText('う す ゆ き ど っ と ね っ と').click();
		await page.getByRole('link', { name: '動画作品' }).click();
		await page.getByRole('link', { name: 'うすゆきどっとねっと' }).click();
		await page.getByRole('link', { name: 'もっと知る！' }).click();
		await page.getByRole('main').getByRole('link', { name: '技術スタック' }).click();
		await page.getByRole('link', { name: 'うすゆきどっとねっと' }).click();
	});
});
