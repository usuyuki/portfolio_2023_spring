import { json } from "@sveltejs/kit";

// cloudflare workers kv のcounternの値をインクリメントする
// SvelteKitのjsonはResponseオブジェクトを作ってくれるので問題ないが、asyncだと Invalid response from route /api/counter: handler should return a Response objectとなるっぽい？？
// 動作上は問題ないので一旦保留
export const PATCH = async ({ platform }) => {
	if (platform?.env?.KV) {
		const { KV } = platform.env;
		// Cloudflare Workersでのillegal invocation回避のため.bind(console)を使用
		const log = console.log.bind(console);
		const counter: string = await KV.get("counter");
		log(counter);
		const nOfVisitor = Number(counter) + 1;
		log(nOfVisitor);
		//アクセスカウンタ増やす(リロードで増えてしまうが、IPとか取って判定厳密にするの大変なので後回し。現実的にはクッキー見て判定とかが良さそう)
		await KV.put("counter", nOfVisitor);
		return json({
			nOfVisitor: nOfVisitor.toString(),
			message: "お越しいただきありがとうございます！",
		});
	} else {
		return json({
			nOfVisitor: 0,
			message: "カウントできませんでした...",
		});
	}
};
