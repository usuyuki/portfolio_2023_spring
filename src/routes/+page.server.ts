import { env } from "cloudflare:workers";
import type { blogContentType } from "#lib/types/blogContent.ts";
import type { misskeyContentType } from "#lib/types/misskeyContent.ts";
import type {
	InfoDatabaseRow,
	NotionDatabaseResponse,
	WorksProgrammingRow,
} from "#lib/types/notion.ts";
import type { worksProgrammingTopPageType } from "#lib/types/works/worksProgramming.ts";
import {
	queryDataSourceCached,
	CACHE_TTL,
} from "#lib/utils/adapter/notionAdapter.ts";
import { getRecentArticle } from "#lib/utils/usecase/getRecentArticle.ts";
import { getRecentMisskeyNotes } from "#lib/utils/usecase/getRecentMisskeyNotes.ts";
import type { PageServerLoad } from "./$types";

type infoType = {
	[key: string]: string;
};
type dataType = {
	info: infoType;
	blogs: blogContentType[];
	works: worksProgrammingTopPageType[];
	accessCounterValue: string;
	misskeyNotes: misskeyContentType[];
};

export const load = (async ({ fetch }): Promise<dataType> => {
	/**
	 * トップページに必要な5つの外部データ取得はお互い依存関係がないため、
	 * 直列awaitだと各APIのレイテンシが単純合算されてしまう。Promise.allで並列化する。
	 */
	const [nOfVisitorValue, response, blogContent, misskeyNotes, worksResponse] =
		await Promise.all([
			/**
			 * cloudflare workers kv からアクセスカウンタの値を引っ張る
			 */
			env.KV !== undefined ? env.KV.get("counter") : Promise.resolve("7777"), //ローカルでは使えないのでこの値を出す

			/**
			 * トップ用のデータ取得
			 */
			queryDataSourceCached(
				"b8ec3c117d1b4677947153bbe44bd42d",
				{},
				{
					fetch,
					kv: env.KV,
					cacheTtl: CACHE_TTL.INFO_DB,
				},
			) as unknown as Promise<NotionDatabaseResponse<InfoDatabaseRow>>,

			/**
			 * ブログデータ取得
			 */
			getRecentArticle(fetch),

			/**
			 * Misskeyの最近の投稿を取得
			 */
			getRecentMisskeyNotes(fetch, env.KV),

			/**
			 * 作品データ取得
			 * 3つだけ
			 */
			queryDataSourceCached(
				"a448d280a2e840d6a4baa3a34fb853b4",
				{
					page_size: 3,
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
					cacheTtl: CACHE_TTL.PROGRAMMING_WORKS_DB,
				},
			) as unknown as Promise<NotionDatabaseResponse<WorksProgrammingRow>>,
		]);

	const dataInfo: infoType = {};
	response.results.forEach((row: InfoDatabaseRow) => {
		dataInfo[row.properties.key.title[0].plain_text] =
			row.properties.value.rich_text[0].plain_text;
	});

	const worksContent: worksProgrammingTopPageType[] = [];
	worksResponse.results.forEach((row: WorksProgrammingRow) => {
		worksContent.push({
			id: row.id,
			name: row.properties.name.title[0].plain_text,
			//galleryの1枚目をサムネイルとして使う
			thumbnail: row.properties.gallery.files[0].file.url,
			publishedAt: row.properties.publishedAt.date.start.replace(/-/g, "/"),
		});
	});

	return {
		info: dataInfo,
		blogs: blogContent,
		works: worksContent,
		// KVにcounterキーが未作成の場合はnullが返るため0扱いにする
		accessCounterValue: nOfVisitorValue ?? "0",
		misskeyNotes,
	};
}) satisfies PageServerLoad;
