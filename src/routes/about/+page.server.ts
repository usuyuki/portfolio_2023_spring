import type { aboutType } from '$lib/types/about';
import { notionAdapter } from '$lib/utils/adapter/notionAdapter';
import type { PageServerLoad } from './$types';
type dataType = {
	data: aboutType[];
};

export const load = (async () => {
	const response = await notionAdapter.databases.query({
		database_id: '74fe901686ac47a1835e3dfdb76ecc60',
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
