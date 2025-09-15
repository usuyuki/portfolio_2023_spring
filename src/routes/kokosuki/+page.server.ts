import type { kokosukiType } from "$lib/types/kokosuki";
import type {
	GenericDatabaseRow,
	NotionDatabaseResponse,
} from "$lib/types/notion";
import { queryDataSource } from "$lib/utils/adapter/notionAdapter";
import type { PageServerLoad } from "./$types";

type dataType = {
	data: kokosukiType[];
};

export const load = (async ({ platform, fetch }) => {
	const response = (await queryDataSource(
		"7d8c09c593ed4e0fb025044dab034a42",
		{
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
		},
		platform?.fetch || fetch,
	)) as unknown as NotionDatabaseResponse<GenericDatabaseRow>;

	const data: dataType = { data: [] };

	response.results.forEach((row: GenericDatabaseRow) => {
		data.data.push({
			name: row.properties.name.title[0].plain_text,
			content: row.properties.content?.rich_text[0].plain_text || "",
		});
	});
	return data;
}) satisfies PageServerLoad;
