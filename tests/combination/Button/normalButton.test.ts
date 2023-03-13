import Button from '$lib/components/atom/button/NormalButton.svelte';
import { expect, test } from '@playwright/experimental-ct-svelte';
test.describe('ボタンの表示テスト', () => {
	test('normalButton.svelte', async ({ mount }) => {
		console.log(Button);
		const component = await mount(Button);
		const paragraph = component.locator('p');
		await expect(await paragraph.textContent()).toBe('ボタン名');
	});
});
