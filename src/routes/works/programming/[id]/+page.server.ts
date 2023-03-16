// 個別のページでも全体のデータ使いたいので+layout.server.tsで取得
import { NOTION_API_KEY } from '$env/static/private';
import type { worksProgrammingType } from '$lib/types/worksProgramming';
import { APIErrorCode, Client } from '@notionhq/client';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// id:データになっている
type dataType = {
	data: worksProgrammingType;
};
export const load = (async (params: any) => {
	const notion = new Client({
		auth: NOTION_API_KEY
	});
	try {
		/** @todo NotionSDKのretrieveの型が壊れているっぽいので、後ろ全部静的解析で壊さないためにanyにキャストする(TSのメリット潰してるからやめたい) */
		const response = (await notion.pages.retrieve({
			page_id: params.params.id
		})) as any;
		// publishしてない記事を弾く
		if (!response.properties.isPublished.checkbox) {
			throw error(403);
			//処理はtry catchのcatchで続く
		}
		const data: dataType = {
			data: {
				background: response.properties.background.rich_text[0].plain_text,
				tech: response.properties.tech.multi_select.map((item: any) => {
					return { name: item.name, id: item.id };
				}),
				logo: response.properties.logo.files[0].file.url,
				thumbnail: response.properties.thumbnail.files[0].file.url,
				gitHub: response.properties.gitHub.url,
				link: response.properties.link.url,
				summary: response.properties.summary.rich_text[0].plain_text,
				whatToOffer: response.properties.whatToOffer.rich_text[0].plain_text,
				genre: {
					name: response.properties.genre.select.name,
					id: response.properties.genre.select.id
				},
				publishedAt: response.properties.publishedAt.date.start.replace(/-/g, '/'),
				toWhom: response.properties.toWhom.rich_text[0].plain_text,
				form: {
					name: response.properties.form.select.name,
					id: response.properties.form.select.id
				},
				kodawari: response.properties.kodawari.rich_text[0].plain_text,
				kana: response.properties.kana.rich_text[0].plain_text,
				gallery: response.properties.gallery.files.map((item: any) => {
					return item.file.url;
				}),
				name: response.properties.name.title[0].plain_text
			}
		};
		return data;
	} catch (e: any) {
		console.log(e);
		//notionSdkでなくこちらで吐かせたエラーの処理
		if (e.status === 403) {
			throw error(403, '403 今は公開してないよ。');
		} else if (
			e.code === APIErrorCode.ValidationError ||
			e.code === APIErrorCode.ObjectNotFound
		) {
			// ValidationErrorを404にするのは変だが、実態は404と同義で扱えるので
			throw error(404, 'そんな作品はありません。');
		} else if (e.code === APIErrorCode.Unauthorized) {
			throw error(500, '製作者へ:サーバー側のAPI呼び出しで認証エラーになっています。');
		} else {
			throw error(500, '未知のエラーです。ごめんなさい');
		}
	}
}) satisfies PageServerLoad;
