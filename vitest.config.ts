import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";

// SvelteKit 3はsrc/env.tsで宣言した環境変数が未設定だと、sveltekit()プラグインの起動時にenv_invalidで落ちる。
// 単体テストは外部APIを呼ばないため、.envが無い環境(CIや新しく手元に落とした場合)でも動くよう、
// 未設定の変数にだけダミー値を入れる。.envや実際の環境変数があればそちらを優先する
const DUMMY_ENV_FOR_UNIT_TEST = {
	GHOST_API_URL: "https://example.com",
	GHOST_CONTENT_KEY: "dummy",
	NOTION_API_KEY: "dummy",
};
for (const [key, value] of Object.entries(DUMMY_ENV_FOR_UNIT_TEST)) {
	process.env[key] ??= value;
}

export default defineConfig({
	// $app/*等のSvelteKitの仮想モジュールと.svelteの変換を解決するためsveltekitプラグインを使う
	plugins: [sveltekit()],
	test: {
		include: ["tests/unit/**/*.{test,spec}.{js,ts}"],
		globals: true,
		environment: "jsdom",
		// 本番のWorkersと同じUTCに固定し、JSTの開発機でだけ通るテストを防ぐ
		env: { TZ: "UTC" },
	},
});
