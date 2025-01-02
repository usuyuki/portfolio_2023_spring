import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	// @ts-expect-error SvelteKitとviteの噛み合わせが今のバージョンだと合わずにエラーになるので一旦もみ消す https://stackoverflow.com/questions/79297794/sveltekit-no-overload-matches-this-call-error-invite-config-js-when-working-w
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
