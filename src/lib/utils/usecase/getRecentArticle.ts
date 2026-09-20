import type { blogContentType } from "$lib/types/blogContent";
import {
	fetchRecentPosts,
	toBlogContent,
} from "$lib/utils/adapter/ghostAdapter";

export const getRecentArticle = async (
	fetchFn?: typeof globalThis.fetch,
): Promise<blogContentType[]> => {
	const posts = await fetchRecentPosts(3, fetchFn).catch((err: Error) => {
		console.error(err);
	});
	if (!posts) {
		// Ghostに影響されてポートフォリオ死んでほしくないので、空で返してエラーを握りつぶす
		// return Promise.reject(new Error('記事の取得に失敗しました。'));
		return [];
	}
	return posts.map(toBlogContent);
};
