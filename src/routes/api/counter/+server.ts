import { env } from "cloudflare:workers";
import { incrementAccessCounter } from "#lib/utils/usecase/accessCounter.ts";
import type { RequestHandler } from "./$types";

// cloudflare workers kv のcounterの値をインクリメントする
// アクセスカウンタ増やす(リロードで増えてしまうが、IPとか取って判定厳密にするの大変なので後回し。現実的にはクッキー見て判定とかが良さそう)
export const PATCH: RequestHandler = async () => {
	const nOfVisitor = await incrementAccessCounter(env.KV);
	if (nOfVisitor === null) {
		return Response.json({
			nOfVisitor: 0,
			message: "カウントできませんでした...",
		});
	}
	return Response.json({
		nOfVisitor: nOfVisitor.toString(),
		message: "お越しいただきありがとうございます！",
	});
};
