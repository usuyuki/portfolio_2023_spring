import { notionAdapter } from '$lib/utils/adapter/notionAdapter';
import type { PageServerLoad } from './$types';
type techStack = {
	name: string;
	content: string;
	power: number;
};

// ジャンルごとに ジャンル:データ となるようにしている
type dataType = {
	data: {
		[key: string]: techStack[];
	};
};

export const load = (async () => {
	const response = await notionAdapter.databases.query({
		database_id: 'b0f7969c8fc245928e4c2abaa8a2f578',
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
				property: 'updatedAt',
				direction: 'descending'
			}
		]
	});

	const data: dataType = { data: {} };
	response.results.forEach((row: any) => {
		const genre: string = row.properties.genre.select.name;
		const techArray: techStack = {
			name: row.properties.name.title[0].plain_text,
			content: row.properties.content.rich_text[0].plain_text,
			power: row.properties.power.number
		};
		if (genre in data.data) {
			data.data[genre].push(techArray);
		} else {
			data.data[genre] = [techArray];
		}
	});
	return data;
}) satisfies PageServerLoad;
