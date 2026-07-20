import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			// CIではbuildとpreviewが各々workerdを起動し、.wrangler/stateのSQLiteロックが競合して
			// SQLITE_BUSYでサーバーが落ちるため、永続化せずメモリ上でバインディングをエミュレートする
			platformProxy: {
				persist: process.env.CI ? false : undefined,
			},
		}),
	},
};

export default config;
