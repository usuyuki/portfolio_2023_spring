import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from '@zerodevx/svelte-img/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit(), imagetools()],
	test: {
		include: ['tests/unit/**/*.{test,spec}.{js,ts}'],
		globals: true,
		environment: 'jsdom'
	},
	build: {
		target: 'esnext'
	}
};

export default config;
