import { notionAdaptor } from '$lib/utils/adaptor/notionAdaptor';
import type { PageServerLoad } from './$types';

type dataType = {
	data: {
		name: string;
		content: string;
	}[];
};

export const load = (async () => {
	const response = await notionAdaptor.databases.query({
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
