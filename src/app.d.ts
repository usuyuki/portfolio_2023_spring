// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

/// <reference types="@sveltejs/kit" />
/// <reference types="@sveltejs/adapter-cloudflare-workers" />
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		interface Platform {
			env?: {
				KV: KVNamespace;
			};
		}
	}
}

export { };

