import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
	// $lib等のパスエイリアス解決のためsveltekitプラグインを使う
	plugins: [sveltekit()],
	test: {
		include: ["tests/unit/**/*.{test,spec}.{js,ts}"],
		globals: true,
		environment: "jsdom",
		// 本番のWorkersと同じUTCに固定し、JSTの開発機でだけ通るテストを防ぐ
		env: { TZ: "UTC" },
	},
});
