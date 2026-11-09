import type {
	NotionDatabaseResponse,
	VideoDatabaseRow,
} from "#lib/types/notion.ts";
import type { worksVideoType } from "#lib/types/works/worksVideos.ts";
import { env } from "cloudflare:workers";
import {
	queryDataSourceCached,
	CACHE_TTL,
} from "#lib/utils/adapter/notionAdapter.ts";
import type { PageServerLoad } from "./$types";

type dataType = {
	data: worksVideoType[];
};

export const load = (async ({ fetch }) => {
	const response = (await queryDataSourceCached(
		"dcbb3d52369d4da688bc5be120fc5db6",
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
					property: "publishedAt",
					direction: "descending",
				},
			],
		},
		{
			fetch,
			kv: env.KV,
			cacheTtl: CACHE_TTL.VIDEOS_DB,
		},
	)) as unknown as NotionDatabaseResponse<VideoDatabaseRow>;

	const data: dataType = { data: [] };
	response.results.forEach((row: VideoDatabaseRow) => {
		data.data.push({
			publishedAt: row.properties.publishedAt.date.start,
			name: row.properties.name.title[0].plain_text,
			description: row.properties.description.rich_text[0].plain_text,
			youtubeIframe: row.properties.youTubeIframe.url,
			thumbnail: row.properties.thumbnail.files[0].file.url,
		});
	});
	return data;
}) satisfies PageServerLoad;
