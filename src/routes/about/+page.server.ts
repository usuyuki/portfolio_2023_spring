import { NOTION_API_KEY } from '$env/static/private';
import { Client } from '@notionhq/client';
import type { PageServerLoad } from './$types';

type dataType = {
	data: {
		name: string;
		content: string;
	}[];
};

export const load = (async () => {
	const notion = new Client({
		auth: NOTION_API_KEY
	});

	const response = await notion.databases.query({
		database_id: '74fe901686ac47a1835e3dfdb76ecc60',
	});

	const data: dataType = { data: [] };

	response.results.forEach((row: any) => {
		data.data.push({
			name: row.properties.name.title[0].plain_text,
			content: row.properties.content.rich_text[0].plain_text,
		});
	});
	return data;
}) satisfies PageServerLoad;
