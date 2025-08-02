import type { linkType } from "$lib/types/link";
import type {
	GenericDatabaseRow,
	NotionDatabaseResponse,
} from "$lib/types/notion";
import { getNotionClient } from "$lib/utils/adapter/notionAdapter";
import type { PageServerLoad } from "./$types";

type dataType = {
	data: {
		[key: string]: linkType[];
	};
};

export const load = (async ({ platform, fetch }) => {
	const response = (await getNotionClient(
		platform?.fetch || fetch,
	).databases.query({
		database_id: "d773ca5cc7a14127b45b902d6129a321",
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
				property: "updatedAt",
				direction: "descending",
			},
		],
	})) as unknown as NotionDatabaseResponse<GenericDatabaseRow>;

	const data: dataType = { data: {} };
	response.results.forEach((row: GenericDatabaseRow) => {
		const genre: string = row.properties.genre?.select.name || "";
		const techArray: linkType = {
			name: row.properties.name.title[0].plain_text,
			url: row.properties.url?.url || "",
		};
		if (genre in data.data) {
			data.data[genre].push(techArray);
		} else {
			data.data[genre] = [techArray];
		}
	});
	return data;
}) satisfies PageServerLoad;
