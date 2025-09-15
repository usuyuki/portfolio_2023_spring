import type { historyType } from "$lib/types/history";
import type {
	GenericDatabaseRow,
	NotionDatabaseResponse,
} from "$lib/types/notion";
import { queryDataSourceCached, CACHE_TTL } from "$lib/utils/adapter/notionAdapter";
import type { PageServerLoad } from "./$types";

type dataType = {
	data: {
		[key: string]: historyType[];
	};
};

export const load = (async ({ platform, fetch }) => {
	const response = (await queryDataSourceCached(
		"a0a905a075ae4a83868984c5b53705e8",
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
			sorts: [
				{
					property: "date",
					direction: "descending",
				},
			],
		},
		{
			fetch: platform?.fetch || fetch,
			kv: platform?.env?.KV,
			cacheTtl: CACHE_TTL.HISTORY_DB,
		},
	)) as unknown as NotionDatabaseResponse<GenericDatabaseRow>;

	const data: dataType = { data: {} };
	response.results.forEach((row: GenericDatabaseRow) => {
		const genre: string = row.properties.genre?.select.name || "";
		const techArray: historyType = {
			name: row.properties.name.title[0].plain_text,
			content: row.properties.content?.rich_text[0].plain_text || "",
			start_date: row.properties.date?.date.start || "",
			end_date: row.properties.date?.date.end || null,
		};
		if (genre in data.data) {
			data.data[genre].push(techArray);
		} else {
			data.data[genre] = [techArray];
		}
	});
	return data;
}) satisfies PageServerLoad;
