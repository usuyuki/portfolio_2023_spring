import type { blogContent } from '$lib/types/blogContent';
import { ghostAdaptor } from '$lib/utils/adaptor/ghostAdaptor';
export const getRecentArticle = async ():Promise<blogContent[]> => {

	const articles = await ghostAdaptor.posts
		.browse({
			limit: 5
		})
		.catch((err: any) => {
			console.error(err);
		});
		console.log(articles);
		
		return articles.map((article: any) => {
			return {
				title: article.title,
				slug: article.slug,
				date: article.created_at,
				thumbnail: article.feature_image
			};
		});

}
