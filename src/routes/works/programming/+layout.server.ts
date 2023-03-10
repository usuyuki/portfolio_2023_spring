// 個別のページでも全体のデータ使いたいので+layout.server.tsで取得
import { NOTION_API_KEY } from '$env/static/private';
import type { worksProgrammingShortType } from '$lib/types/worksProgramming';
import { Client } from '@notionhq/client';
import type { LayoutServerLoad } from './$types';

// id:データになっている
type dataType = {
	data: {
		[key: string]: worksProgrammingShortType;
	};
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

	const data: dataType = { data: {} };

	response.results.forEach((row: any) => {
		data.data[row.id] = {
			name: row.properties.name.title[0].plain_text,
			summary: row.properties.summary.rich_text[0].plain_text,
			publishedAt: row.properties.publishedAt.date.start.replace(/-/g, '/')
		};
	});
	return data;
}) satisfies LayoutServerLoad;
