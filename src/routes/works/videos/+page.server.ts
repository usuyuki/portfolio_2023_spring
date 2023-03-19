import type { worksVideoType } from '$lib/types/works/worksVideos';
import { notionAdapter } from '$lib/utils/adapter/notionAdapter';
import type { PageServerLoad } from './$types';
type dataType = {
	data: worksVideoType[];
};

export const load = (async () => {
	const response = await notionAdapter.databases.query({
		database_id: 'dcbb3d52369d4da688bc5be120fc5db6',
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

	const data: dataType = { data: [] };
	response.results.forEach((row: any) => {
		data.data.push({
			publishedAt: row.properties.publishedAt.date.start,
			name: row.properties.name.title[0].plain_text,
			description: row.properties.description.rich_text[0].plain_text,
			youtubeIframe: row.properties.youTubeIframe.url,
			thumbnail: row.properties.thumbnail.files[0].file.url
		});
	});
	return data;
}) satisfies PageServerLoad;
