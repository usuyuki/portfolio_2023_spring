import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
	webServer: {
		// CIではワークフロー側でbuild済みなのでpreviewのみ起動する(二重ビルド防止)
		command: process.env.CI ? "pnpm preview" : "pnpm build && pnpm preview",
		port: 4173,
		timeout: 120_000,
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
