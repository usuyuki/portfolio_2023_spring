import type { aboutType } from "$lib/types/about";
import type {
	GenericDatabaseRow,
	NotionDatabaseResponse,
} from "$lib/types/notion";
import { queryDataSourceCached, CACHE_TTL } from "$lib/utils/adapter/notionAdapter";
import type { PageServerLoad } from "./$types";

type dataType = {
	data: aboutType[];
};

export const load = (async ({ platform, fetch }) => {
	const response = (await queryDataSourceCached(
		"74fe901686ac47a1835e3dfdb76ecc60",
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
		{
			fetch: platform?.fetch || fetch,
			kv: platform?.env?.KV,
			cacheTtl: CACHE_TTL.ABOUT_DB,
		},
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
