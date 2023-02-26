import Button from '$lib/components/Button/normalButton.svelte';
import { expect, test } from '@playwright/experimental-ct-svelte';
test.describe('ボタンの表示テスト', () => {
	test('normalButton.svelte', async ({ mount }) => {
		const component = await mount(Button);
		const paragraph = component.locator('p');
		await expect(await paragraph.textContent()).toBe('ボタン名');
	});
});
