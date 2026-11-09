import type { blogContentType } from "#lib/types/blogContent.ts";

export async function getBlogData(): Promise<blogContentType[]> {
	const repoUrl = "https://blog.usuyuki.net/wp-json/wp/v2/posts?per_page=5";
	const response = await fetch(repoUrl);
	// Workersのランタイム型ではResponse.json()がunknownを返すため、WordPress REST APIの形を明示する
	const blogs = (await response.json()) as {
		title: { rendered: string };
		date_gmt: string;
		link: string;
		thumbnail: { url: string };
	}[];

	return blogs.map((blog) => {
		return {
			title: blog.title.rendered,
			date: blog.date_gmt,
			link: blog.link,
			thumbnail: blog.thumbnail.url,
		};
	});
}
