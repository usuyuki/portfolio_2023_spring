import type { kokosukiType } from '$lib/types/kokosuki';
import { notionAdapter } from '$lib/utils/adapter/notionAdapter';
import type { PageServerLoad } from './$types';
type dataType = {
	data: kokosukiType[];
};

export const load = (async () => {
	const response = await notionAdapter.databases.query({
		database_id: '7d8c09c593ed4e0fb025044dab034a42',
		filter: {
			or: [
				{
					property: 'isPublished',
					checkbox: {
						equals: true
					}
				}
			]
		}
	});

	const data: dataType = { data: [] };

	response.results.forEach((row: any) => {
		data.data.push({
			name: row.properties.name.title[0].plain_text,
			content: row.properties.content.rich_text[0].plain_text
		});
	});
	return data;
}) satisfies PageServerLoad;
