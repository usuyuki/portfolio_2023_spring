import type { worksSlideType } from "$lib/types/works/worksSlides";
import type {
	GenericDatabaseRow,
	NotionDatabaseResponse,
} from "$lib/types/notion";
import { notionAdapter } from "$lib/utils/adapter/notionAdapter";
import type { PageServerLoad } from "./$types";

type dataType = {
	data: {
		[key: string]: worksSlideType[];
	};
};

export const load = (async () => {
	const response = (await notionAdapter.databases.query({
		database_id: "d5b6c2e74260462e97e24ed898399337",
		filter: {
			or: [
				{
					property: "isPublished",
					checkbox: {
						equals: true,
					},
				},
			],
		},
		sorts: [
			{
				property: "publishedAt",
				direction: "descending",
			},
		],
	})) as unknown as NotionDatabaseResponse<GenericDatabaseRow>;

	const data: dataType = { data: {} };
	response.results.forEach((row: GenericDatabaseRow) => {
		const genre: string = row.properties.genre?.select.name || "";
		const techArray: worksSlideType = {
			publishedAt: row.properties.publishedAt?.date.start || "",
			name: row.properties.name.title[0].plain_text,
			description: row.properties.description?.rich_text[0].plain_text || "",
			slideIframe: row.properties.slideIframe?.url || "",
		};
		if (genre in data.data) {
			data.data[genre].push(techArray);
		} else {
			data.data[genre] = [techArray];
		}
	});
	return data;
}) satisfies PageServerLoad;
