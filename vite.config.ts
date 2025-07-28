import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	// @ts-expect-error - Vite 7.x type compatibility issue with SvelteKit plugins
	plugins: [sveltekit()],
	build: {
		target: 'esnext'
	},
	server: {
		hmr: true
	}
});
