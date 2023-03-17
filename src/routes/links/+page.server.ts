import { notionAdaptor } from '$lib/utils/adaptor/notionAdaptor';
import type { PageServerLoad } from './$types';
type techStack = {
	name: string;
	url: string;
};

type dataType = {
	data: {
		[key: string]: techStack[];
	};
};

export const load = (async () => {
	const response = await notionAdaptor.databases.query({
		database_id: 'd773ca5cc7a14127b45b902d6129a321',
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
			url: row.properties.url.url
		};
		if (genre in data.data) {
			data.data[genre].push(techArray);
		} else {
			data.data[genre] = [techArray];
		}
	});
	return data;
}) satisfies PageServerLoad;
