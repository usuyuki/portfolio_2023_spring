import { test } from '@playwright/test';

test.describe('移動しての動作テスト', () => {
	test('らんだむさーふぁー', async ({ page }) => {
		// 結構重いので終わるようにタイムアウトを長めに取る
		await page.setDefaultTimeout(60000);
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
	});
});
