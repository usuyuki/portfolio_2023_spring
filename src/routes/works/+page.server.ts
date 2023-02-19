import { NOTION_API_KEY } from '$env/static/private';
import { Client } from '@notionhq/client';
import type { PageServerLoad } from './$types';

type dataType = {
	data: {
		name: string;
		summary: string;
		date: string;
	}[];
};

export const load = (async () => {
	const notion = new Client({
		auth: NOTION_API_KEY
	});

	const response = await notion.databases.query({
		database_id: 'a448d280a2e840d6a4baa	3a34fb853b4',
		filter: {
			or: [
				{
					property: 'isPublished',
					checkbox: {
						equals: true
					}
				}
			]
		},
		sorts: [
			{
				property: 'publishedAt',
				direction: 'descending'
			}
		]
	});

	const data: dataType = { data: [] };

	response.results.forEach((row: any) => {
		data.data.push({
			name: row.properties.name.title[0].plain_text,
			summary: row.properties.summary.rich_text[0].plain_text,
			date: row.properties.publishedAt.date.start.replace(/-/g, '/')
		});
	});
	return data;
}) satisfies PageServerLoad;
