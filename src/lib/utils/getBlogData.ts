import type { blogContent } from '$lib/types/blogContent';

export async function getBlogData(): Promise<blogContent[]> {
	const repoUrl = 'https://blog.usuyuki.net/wp-json/wp/v2/posts?per_page=5';
	const response = await fetch(repoUrl);
	const blogs = await response.json();

	return blogs.map((blog: any) => {
		return {
			title: blog.title.rendered,
			date: blog.date_gmt,
			link: blog.link,
			thumbnail: blog.thumbnail.url
		};
	});
}
