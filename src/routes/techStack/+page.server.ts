import { NOTION_API_KEY } from '$env/static/private';
import type { techStackGenre } from '$lib/types/techStackGenre';
import { Client } from '@notionhq/client';
import type { PageServerLoad } from './$types';
type techStack ={
			name: string;
			content: string;
			power: number;
}

type dataType = {
	data: {
		[key in techStackGenre]:techStack[]
	};
};

export const load = (async () => {
	const notion = new Client({
		auth: NOTION_API_KEY
	});

	const response = await notion.databases.query({
		database_id: 'b0f7969c8fc245928e4c2abaa8a2f578',
		sorts: [
			{
				property: 'updatedAt',
				direction: 'descending'
			}
		]
	});

	const data: dataType = { data: {
		language:[],
		framework:[],
		CMS:[],
		software:[],
		environment:[],
	} };
	response.results.forEach((row: any) => {
		const genre:techStackGenre =  row.properties.genre.select.name;
		const techArray:techStack ={
			name: row.properties.name.title[0].plain_text,
			content: row.properties.content.rich_text[0].plain_text,
			power: row.properties.power.number,
		}
			data.data[genre].push(techArray);
	});
	return data;
}) satisfies PageServerLoad;
