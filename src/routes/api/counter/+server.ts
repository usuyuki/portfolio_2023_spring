import { json } from '@sveltejs/kit';

// cloudflare workers kv のcounternの値をインクリメントする
export const PATCH = async ({ platform }) => {
	if (platform !== undefined && platform.env !== undefined) {
		const counter: string = await platform.env.KV.get('counter');
		console.log(counter);
		const nOfVisitor = Number(counter) + 1;
		console.log(nOfVisitor);
		//アクセスカウンタ増やす(リロードで増えてしまうが、IPとか取って判定厳密にするの大変なので後回し。現実的にはクッキー見て判定とかが良さそう)
		await platform.env.KV.put('counter', nOfVisitor);
		return json({
			nOfVisitor: nOfVisitor.toString(),
			message: '来てくれてありがとう'
		});
	}
};
