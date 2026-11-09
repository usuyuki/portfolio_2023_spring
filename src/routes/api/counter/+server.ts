import { env } from "cloudflare:workers";
import type { RequestHandler } from "./$types";

// cloudflare workers kv のcounterの値をインクリメントする
export const PATCH: RequestHandler = async () => {
	if (env.KV) {
		// Cloudflare Workersでのillegal invocation回避のため.bind(console)を使用
		const log = console.log.bind(console);
		const counter = await env.KV.get("counter");
		log(counter);
		const nOfVisitor = Number(counter) + 1;
		log(nOfVisitor);
		//アクセスカウンタ増やす(リロードで増えてしまうが、IPとか取って判定厳密にするの大変なので後回し。現実的にはクッキー見て判定とかが良さそう)
		await env.KV.put("counter", nOfVisitor.toString());
		return Response.json({
			nOfVisitor: nOfVisitor.toString(),
			message: "お越しいただきありがとうございます！",
		});
	}
	return Response.json({
		nOfVisitor: 0,
		message: "カウントできませんでした...",
	});
};
