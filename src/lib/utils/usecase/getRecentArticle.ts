import type { blogContent } from '$lib/types/blogContent';
import { ghostAdaptor } from '$lib/utils/adaptor/ghostAdaptor';
export const getRecentArticle = async (): Promise<blogContent[]> => {
	const articles = await ghostAdaptor.posts
		.browse({
			limit: 3
		})
		.catch((err: any) => {
			console.error(err);
		});
	if (!articles) return Promise.reject(new Error('記事の取得に失敗しました。'));
	return articles.map((article: any) => {
		return {
			title: article.title,
			link: 'https://blog.usuyuki.net/' + article.slug,
			//ISO形式をY-m-dにする
			date: article.created_at.replace(/-/g, '/'),
			thumbnail: article.feature_image
		};
	});
};
