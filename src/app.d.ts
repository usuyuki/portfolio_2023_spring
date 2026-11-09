// See https://svelte.dev/docs/kit/types#app
// for information about these interfaces
// and what to do when importing types

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
	}

	// `import { env } from "cloudflare:workers"` で参照するバインディングの型。
	// `wrangler types` でEnvまで生成すると ./.cloudflare/worker(ビルド成果物)をimportする型が出力され、
	// ビルド後にsvelte-checkが成果物まで検査してしまうため、Envだけはここで手書きする
	namespace Cloudflare {
		interface Env {
			KV: KVNamespace;
		}
	}
}

export {};
