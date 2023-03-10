import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
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
