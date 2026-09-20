import { GHOST_API_URL, GHOST_CONTENT_KEY } from "$env/static/private";
import type { blogContentType } from "$lib/types/blogContent";
import { optimizeGhostImageUrl } from "$lib/utils/optimizeGhostImages";

export type GhostPost = {
	title?: string;
	slug?: string;
	created_at?: string;
	feature_image?: string;
};

type GhostPostsResponse = {
	posts?: GhostPost[];
};

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

// 公式SDKはaxiosがcache:'default'を送りWorkersで必ず失敗するため使わない
export const fetchRecentPosts = async (
	limit: number,
	fetchFn?: typeof globalThis.fetch,
): Promise<GhostPost[]> => {
	const endpoint = `${GHOST_API_URL}/ghost/api/content/posts/?key=${GHOST_CONTENT_KEY}&limit=${limit}`;
	// Workersではbindしないと Illegal invocation になる
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
