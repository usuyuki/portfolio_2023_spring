import { NOTION_API_KEY } from '$env/static/private';
import type { blogContent } from '$lib/types/blogContent';
import { getBlogData } from '$lib/utils/getBlogData';
import { Client } from '@notionhq/client';
import type { PageServerLoad } from './$types';

type dataType = {
	info: { [key: string]: string };
	blog: blogContent[];
};

export const load = (async () => {
	const notion = new Client({
		auth: NOTION_API_KEY
	});
	const response = await notion.databases.query({
		database_id: 'b8ec3c117d1b4677947153bbe44bd42d'
	});
	const data: dataType = { info: {}, blog: [] };

	response.results.forEach((row: any) => {
		data.info[row.properties.key.title[0].plain_text] =
			row.properties.value.rich_text[0].plain_text;
	});

	data.blog = await getBlogData();

	return data;
}) satisfies PageServerLoad;
