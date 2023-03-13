import { ghostAdaptor } from '$lib/utils/adaptor/ghostAdaptor';

export const getRecentArticle = await ghostAdaptor.posts
	.browse({
		limit: 10
	})
	.catch((err: any) => {
		console.error(err);
	});
