import { NOTION_API_KEY } from '$env/static/private';
import { Client } from '@notionhq/client';

export default async function database() {
	const notion = new Client({
		auth: NOTION_API_KEY
	});
	const data = notion.databases.query({
		database_id: 'a448d280a2e840d6a4baa3a34fb853b4',
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
	console.log(data);
	return data;
}
