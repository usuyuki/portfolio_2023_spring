// 個別のページでも全体のデータ使いたいので+layout.server.tsで取得

import type {
	NotionDatabaseResponse,
	WorksProgrammingRow,
} from "$lib/types/notion";
import type { worksProgrammingShortType } from "$lib/types/works/worksProgramming";
import { queryDataSourceCached } from "$lib/utils/adapter/notionAdapter";
import type { LayoutServerLoad } from "./$types";

// id:データになっている
type dataType = {
	data: {
		[key: string]: worksProgrammingShortType;
	};
};
export const load = (async ({ platform, fetch }) => {
	const response = (await queryDataSourceCached(
		"a448d280a2e840d6a4baa3a34fb853b4",
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
			fetch: platform?.fetch || fetch,
			kv: platform?.env?.KV,
			cacheTtl: 7200, // 2 hours cache for programming works list
		},
	)) as unknown as NotionDatabaseResponse<WorksProgrammingRow>;

	const data: dataType = { data: {} };

	response.results.forEach((row: WorksProgrammingRow) => {
		//ここですべてのデータはとれる
		/** @todo 個別ページはlayoutから渡すようにするとAPI叩く回数減らせる(本来の使い方と反するので、エラーハンドリングが面倒で保留にしている) */
		data.data[row.id] = {
			name: row.properties.name.title[0].plain_text,
			//galleryの1枚目をサムネイルとして使う
			thumbnail: row.properties.gallery.files[0].file.url,
			summary: row.properties.summary.rich_text[0].plain_text,
			publishedAt: row.properties.publishedAt.date.start.replace(/-/g, "/"),
			logo:
				row.properties.logo.files.length !== 0
					? row.properties.logo.files[0].file.url
					: false,
		};
	});
	return data;
}) satisfies LayoutServerLoad;
