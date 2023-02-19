import { NOTION_API_KEY } from '$env/static/private';
import { Client } from '@notionhq/client';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const notion = new Client({
		auth: NOTION_API_KEY
	});
	const response = await notion.databases.query({
		database_id: 'b8ec3c117d1b4677947153bbe44bd42d'
	});
	const data: { [key: string]: string } = {};

	response.results.forEach((row: any) => {
		data[row.properties.key.title[0].plain_text] = row.properties.value.rich_text[0].plain_text;
	});
	return data;
}) satisfies PageServerLoad;
