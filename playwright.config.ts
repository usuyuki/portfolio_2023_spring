import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
	webServer: {
		// previewはwrangler devでビルド済みWorkerをworkerd上で動かす。
		// wrangler.tomlの[build]でpnpm buildが自動実行されるため、ここでは別途ビルドしない。
		// (adapter-cloudflare v8ではvite previewがNode上でcloudflare:workersを解決できず500になるため)
		command: "pnpm preview",
		port: 4173,
		// wrangler devはサーバー起動前にpnpm buildも実行するため、ビルド時間込みで長めに待つ
		timeout: 300_000,
		reuseExistingServer: !process.env.CI,
	},
	testDir: "tests/integration",
	reporter: process.env.CI ? "github" : "html",
	// サーバー起動直後の一時的な失敗に備えてCIのみリトライする
	retries: process.env.CI ? 2 : 0,
	// workersは増やしてもコア数が足りないと重くなるのでそのまにする
	// エンジン差(chromium/gecko/webkit)は見たいのでデスクトップ3ブラウザで実行する
	// Mobile Chrome/Mobile Safariはエンジンが重複するため省略する
	projects: [
		{
			name: "chromium",
			use: {
				...devices["Desktop Chrome"],
			},
		},
		{
			name: "firefox",
			use: {
				...devices["Desktop Firefox"],
			},
		},
		{
			name: "webkit",
			use: {
				...devices["Desktop Safari"],
			},
		},
	],
};

export default config;
