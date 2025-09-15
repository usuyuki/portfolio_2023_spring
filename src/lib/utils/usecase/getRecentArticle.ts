import type { blogContentType } from "$lib/types/blogContent";
import { ghostAdapter } from "$lib/utils/adapter/ghostAdapter";
import { optimizeGhostImageUrl } from "$lib/utils/optimizeGhostImages";

export const getRecentArticle = async (): Promise<blogContentType[]> => {
	const articles = await ghostAdapter.posts
		.browse({
			limit: 3,
		})
		.catch((err: Error) => {
			console.error(err);
		});
	if (!articles) {
		// Ghostに影響されてポートフォリオ死んでほしくないので、空で返してエラーを握りつぶす
		// return Promise.reject(new Error('記事の取得に失敗しました。'));
		return [];
	}
	return articles.map((article) => {
		return {
			title: article.title || "",
			link: `https://blog.usuyuki.net/${article.slug || ""}`,
			//ISO形式をY-m-dにする
			date: article.created_at?.replace(/-/g, "/") || "",
			// w300固定 w100もあるが、流石に小さすぎるのでratina対応も兼ねてw300で固定(元が2000とかあるのでこれでも改善でかい)
			thumbnail: optimizeGhostImageUrl(article.feature_image || "", {
				width: 300,
				height: 300,
			}),
		};
	});
};
