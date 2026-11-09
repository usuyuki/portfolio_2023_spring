import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			// Consult https://kit.svelte.dev/docs/integrations#preprocessors
			// for more information about preprocessors
			preprocess: vitePreprocess(),

			adapter: adapter({
				// CIではbuildとpreviewが各々workerdを起動し、.wrangler/stateのSQLiteロックが競合して
				// SQLITE_BUSYでサーバーが落ちるため、永続化せずメモリ上でバインディングをエミュレートする
				platformProxy: { persist: process.env.CI ? false : undefined },
			}),
		}),
	],
	build: { target: "esnext" },
	server: { hmr: true },
});
