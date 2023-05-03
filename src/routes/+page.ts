import { browser } from '$app/environment';

// ブラウザでのみカウントさせることで機械的なアクセスでのカウントを防ぐ(KVのgetの無料枠をできる限り使わないようにするため)
if (browser) {
	// SvelteKit内のAPIを叩くのでURLは省略できる
	await fetch('/api/counter', {
		method: 'PATCH'
	});
}
