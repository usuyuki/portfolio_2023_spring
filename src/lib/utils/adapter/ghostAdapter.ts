import { GHOST_API_URL, GHOST_CONTENT_KEY } from "$env/static/private";
import type { blogContentType } from "$lib/types/blogContent";
import { optimizeGhostImageUrl } from "$lib/utils/optimizeGhostImages";

// Ghost Content APIのレスポンスのうち、このサイトで使うフィールドだけを定義する
export type GhostPost = {
	title?: string;
	slug?: string;
	created_at?: string;
	feature_image?: string;
};

type GhostPostsResponse = {
	posts?: GhostPost[];
};

// Ghostの記事をトップページ表示用の形式に整形する
export const toBlogContent = (post: GhostPost): blogContentType => {
	return {
		title: post.title || "",
		link: `https://blog.usuyuki.net/${post.slug || ""}`,
		//ISO形式をY-m-dにする
		date: post.created_at?.replace(/-/g, "/") || "",
		// w300固定 w100もあるが、流石に小さすぎるのでratina対応も兼ねてw300で固定(元が2000とかあるのでこれでも改善でかい)
		thumbnail: optimizeGhostImageUrl(post.feature_image || "", {
			width: 300,
			height: 300,
		}),
	};
};

// Ghost Content APIから最新記事を取得する
// 公式SDK(@tryghost/content-api)はaxiosのfetchアダプタ経由でcache:'default'を指定するが、
// Cloudflare Workersのfetchはこれを受け付けず "Unsupported cache mode: default" で必ず失敗する。
// そのためSDKを使わず、Workersネイティブのfetchで直接Content APIを叩く
export const fetchRecentPosts = async (
	limit: number,
	fetchFn?: typeof globalThis.fetch,
): Promise<GhostPost[]> => {
	const endpoint = `${GHOST_API_URL}/ghost/api/content/posts/?key=${GHOST_CONTENT_KEY}&limit=${limit}`;
	// 呼び出し元がfetchを渡さない場合はグローバルのfetchを使う
	// Workersではbindしないと Illegal invocation になるため必ずbindする
	const doFetch = fetchFn ?? globalThis.fetch.bind(globalThis);
	const response = await doFetch(endpoint);
	if (!response.ok) {
		throw new Error(
			`Ghost API responded with ${response.status} ${response.statusText}`,
		);
	}
	const body = (await response.json()) as GhostPostsResponse;
	return body.posts ?? [];
};
