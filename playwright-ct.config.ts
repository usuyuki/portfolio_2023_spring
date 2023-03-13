import type { PlaywrightTestConfig } from '@playwright/experimental-ct-svelte';
import { resolve } from 'node:path';

const config: PlaywrightTestConfig = {
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
};

export default config;
