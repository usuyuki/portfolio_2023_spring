import { defineConfig } from '@playwright/experimental-ct-svelte';
import { resolve } from 'node:path';
export default defineConfig({
	testDir: 'tests/combination',
	use: {
		ctViteConfig: {
			resolve: {
				alias: {
					'$lib/': resolve('src/lib/')
				}
			}
		}
	}
});
