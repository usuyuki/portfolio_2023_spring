// 個別のページでも全体のデータ使いたいので+layout.server.tsで取得

import type {
	NotionDatabaseResponse,
	WorksProgrammingRow,
} from "$lib/types/notion";
import type { worksProgrammingFullType } from "$lib/types/works/worksProgramming";
import {
	queryDataSourceCached,
	CACHE_TTL,
} from "$lib/utils/adapter/notionAdapter";
import type { LayoutServerLoad } from "./$types";

// id:データになっている
// 個別ページ([id]/+page.server.ts)が必要とする全フィールドもここで持たせておくことで、
// 個別ページ側でNotion pages.retrieveを再度呼ぶ必要をなくす
type allWorksDataType = {
	allWorks: {
		[key: string]: worksProgrammingFullType;
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
			cacheTtl: CACHE_TTL.PROGRAMMING_WORKS_DB,
		},
	)) as unknown as NotionDatabaseResponse<WorksProgrammingRow>;

	const data: allWorksDataType = { allWorks: {} };

	response.results.forEach((row: WorksProgrammingRow) => {
		//ここですべてのデータはとれる
		data.allWorks[row.id] = {
			slug: row.id,
			name: row.properties.name.title[0].plain_text,
			//galleryの1枚目をサムネイルとして使う
			thumbnail: row.properties.gallery.files[0].file.url,
			summary: row.properties.summary.rich_text[0].plain_text,
			publishedAt: row.properties.publishedAt.date.start.replace(/-/g, "/"),
			logo:
				row.properties.logo.files.length !== 0
					? row.properties.logo.files[0].file.url
					: false,
			background: row.properties.background.rich_text[0].plain_text,
			content:
				row.properties.content.rich_text.length === 0
					? null
					: row.properties.content.rich_text[0].plain_text,
			tech: row.properties.tech.multi_select.map((item) => {
				return { name: item.name, id: item.id };
			}),
			gitHub: row.properties.gitHub.url,
			link: row.properties.link.url,
			whatToOffer: row.properties.whatToOffer.rich_text[0].plain_text,
			genre: {
				name: row.properties.genre.select.name,
				id: row.properties.genre.select.id,
			},
			toWhom: row.properties.toWhom.rich_text[0].plain_text,
			form: {
				name: row.properties.form.select.name,
				id: row.properties.form.select.id,
			},
			kodawari: row.properties.kodawari.rich_text[0].plain_text,
			kana: row.properties.kana.rich_text[0].plain_text,
			gallery: row.properties.gallery.files.map((item) => {
				return item.file.url;
			}),
			isPublished: row.properties.isPublished.checkbox,
		};
	});
	return data;
}) satisfies LayoutServerLoad;
