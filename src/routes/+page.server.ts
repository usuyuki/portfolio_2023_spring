import type { blogContentType } from '$lib/types/blogContent';
import type { worksProgrammingTopPageType } from '$lib/types/works/worksProgramming';
import { notionAdapter } from '$lib/utils/adapter/notionAdapter';
import { getRecentArticle } from '$lib/utils/usecase/getRecentArticle';
import type { PageServerLoad } from './$types';
type infoType = {
	[key: string]: string;
};
type dataType = {
	info: infoType;
	blogs: blogContentType[];
	works: worksProgrammingTopPageType[];
	accessCounterValue: string;
};

export const load = (async ({ platform }): Promise<dataType> => {
	//
	/**
	 * cloudflare workers kv からアクセスカウンタの値を引っ張る
	 */
	let nOfVisitorValue = '7777'; //ローカルでは使えないのでこの値を出す
	if (platform !== undefined && platform.env !== undefined) {
		nOfVisitorValue = await platform.env.KV.get('counter');
	}

	/**
	 * トップ用のデータ取得
	 */
	const response = await notionAdapter.databases.query({
		database_id: 'b8ec3c117d1b4677947153bbe44bd42d'
	});
	const dataInfo: infoType = {};
	response.results.forEach((row: any) => {
		dataInfo[row.properties.key.title[0].plain_text] =
			row.properties.value.rich_text[0].plain_text;
	});

	/**
	 * ブログデータ取得
	 */

	const blogContent = await getRecentArticle();

	/**
	 * 作品データ取得
	 * 3つだけ
	 */
	const worksResponse = await notionAdapter.databases.query({
		database_id: 'a448d280a2e840d6a4baa3a34fb853b4',
		page_size: 3,
		filter: {
			or: [
				{
					property: 'isPublished',
					checkbox: {
						equals: true
					}
				}
			]
		},
		sorts: [
			{
				property: 'publishedAt',
				direction: 'descending'
			}
		]
	});
	const worksContent: worksProgrammingTopPageType[] = [];
	worksResponse.results.forEach((row: any) => {
		worksContent.push({
			id: row.id,
			name: row.properties.name.title[0].plain_text,
			//galleryの1枚目をサムネイルとして使う
			thumbnail: row.properties.gallery.files[0].file.url,
			publishedAt: row.properties.publishedAt.date.start.replace(/-/g, '/')
		});
	});

	return {
		info: dataInfo,
		blogs: blogContent,
		works: worksContent,
		accessCounterValue: nOfVisitorValue
	};
}) satisfies PageServerLoad;
