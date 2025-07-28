import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	// @ts-expect-error - Vite 7.x type compatibility issue with SvelteKit plugins
	plugins: [sveltekit()],
	test: {
		include: ['tests/unit/**/*.{test,spec}.{js,ts}'],
		globals: true,
		environment: 'jsdom'
	},
	build: {
		target: 'esnext'
	}
});
