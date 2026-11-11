import { env } from "cloudflare:workers";
import type { kokosukiType } from "#lib/types/kokosuki.ts";
import type {
	GenericDatabaseRow,
	NotionDatabaseResponse,
} from "#lib/types/notion.ts";
import {
	CACHE_TTL,
	queryDataSourceCached,
} from "#lib/utils/adapter/notionAdapter.ts";
import type { PageServerLoad } from "./$types";

type dataType = {
	data: kokosukiType[];
};

export const load = (async ({ fetch }) => {
	const response = (await queryDataSourceCached(
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
		{
			fetch,
			kv: env.KV,
			cacheTtl: CACHE_TTL.KOKOSUKI_DB,
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
