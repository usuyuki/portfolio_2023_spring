// 個別のページでも全体のデータ使いたいので+layout.server.tsで取得

import { APIErrorCode } from "@notionhq/client";
import { error } from "@sveltejs/kit";
import type { WorksProgrammingRow } from "$lib/types/notion";
import type { worksProgrammingType } from "$lib/types/works/worksProgramming";
import { getNotionClient, CACHE_TTL } from "$lib/utils/adapter/notionAdapter";
import type { PageServerLoad } from "./$types";

// id:データになっている
type dataType = {
	data: worksProgrammingType;
};
export const load = (async ({ params, platform, fetch }) => {
	const cacheKey = `notion:page:${params.id}`;

	// Check KV cache first
	if (platform?.env?.KV) {
		try {
			const cached = await platform.env.KV.get(cacheKey, { type: "json" });
			if (cached) {
				console.log(`KV cache hit for page: ${params.id}`);
				const response = cached as WorksProgrammingRow;
				// Same logic as below but with cached data
				if (!response.properties.isPublished.checkbox) {
					error(403);
				}
				const data: dataType = {
					data: {
						slug: response.id,
						background: response.properties.background.rich_text[0].plain_text,
						content:
							response.properties.content.rich_text.length === 0
								? null
								: response.properties.content.rich_text[0].plain_text,
						tech: response.properties.tech.multi_select.map((item) => {
							return { name: item.name, id: item.id };
						}),
						logo:
							response.properties.logo.files.length !== 0
								? response.properties.logo.files[0].file.url
								: false,
						gitHub: response.properties.gitHub.url,
						link: response.properties.link.url,
						summary: response.properties.summary.rich_text[0].plain_text,
						whatToOffer: response.properties.whatToOffer.rich_text[0].plain_text,
						genre: {
							name: response.properties.genre.select.name,
							id: response.properties.genre.select.id,
						},
						publishedAt: response.properties.publishedAt.date.start.replace(
							/-/g,
							"/",
						),
						toWhom: response.properties.toWhom.rich_text[0].plain_text,
						form: {
							name: response.properties.form.select.name,
							id: response.properties.form.select.id,
						},
						kodawari: response.properties.kodawari.rich_text[0].plain_text,
						kana: response.properties.kana.rich_text[0].plain_text,
						gallery: response.properties.gallery.files.map((item) => {
							return item.file.url;
						}),
						name: response.properties.name.title[0].plain_text,
					},
				};
				return data;
			}
		} catch (cacheError) {
			console.warn(`KV cache read failed for ${cacheKey}:`, cacheError);
		}
	}

	try {
		const response = (await getNotionClient(
			platform?.fetch || fetch,
		).pages.retrieve({
			page_id: params.id,
		})) as unknown as WorksProgrammingRow;

		// Cache the response
		if (platform?.env?.KV) {
			try {
				await platform.env.KV.put(cacheKey, JSON.stringify(response), {
					expirationTtl: CACHE_TTL.PAGE_RETRIEVE
				});
				console.log(`KV cache stored for page: ${params.id} (TTL: ${CACHE_TTL.PAGE_RETRIEVE}s)`);
			} catch (cacheError) {
				console.warn(`KV cache write failed for ${cacheKey}:`, cacheError);
			}
		}
		// publishしてない記事を弾く
		if (!response.properties.isPublished.checkbox) {
			error(403);
			//処理はtry catchのcatchで続く
		}
		const data: dataType = {
			data: {
				slug: response.id,
				background: response.properties.background.rich_text[0].plain_text,
				content:
					response.properties.content.rich_text.length === 0
						? null
						: response.properties.content.rich_text[0].plain_text,
				tech: response.properties.tech.multi_select.map((item) => {
					return { name: item.name, id: item.id };
				}),
				// ファイル&メディアは値なしだと空配列になる
				logo:
					response.properties.logo.files.length !== 0
						? response.properties.logo.files[0].file.url
						: false,
				// URLは値入れていない場合はnullになるのでそのまま処理不要
				gitHub: response.properties.gitHub.url,
				link: response.properties.link.url,
				summary: response.properties.summary.rich_text[0].plain_text,
				whatToOffer: response.properties.whatToOffer.rich_text[0].plain_text,
				genre: {
					name: response.properties.genre.select.name,
					id: response.properties.genre.select.id,
				},
				publishedAt: response.properties.publishedAt.date.start.replace(
					/-/g,
					"/",
				),
				toWhom: response.properties.toWhom.rich_text[0].plain_text,
				form: {
					name: response.properties.form.select.name,
					id: response.properties.form.select.id,
				},
				kodawari: response.properties.kodawari.rich_text[0].plain_text,
				kana: response.properties.kana.rich_text[0].plain_text,
				gallery: response.properties.gallery.files.map((item) => {
					return item.file.url;
				}),
				name: response.properties.name.title[0].plain_text,
			},
		};
		return data;
	} catch (e: unknown) {
		console.log(e);
		//notionSdkでなくこちらで吐かせたエラーの処理
		const errorObj = e as { status?: number; code?: string };
		if (errorObj.status === 403) {
			error(403, "403 今は公開してないよ。");
		} else if (
			errorObj.code === APIErrorCode.ValidationError ||
			errorObj.code === APIErrorCode.ObjectNotFound
		) {
			// ValidationErrorを404にするのは変だが、実態は404と同義で扱えるので
			error(404, "そんな作品はありません。");
		} else if (errorObj.code === APIErrorCode.Unauthorized) {
			error(
				500,
				"製作者へ:サーバー側のAPI呼び出しで認証エラーになっています。",
			);
		} else {
			error(500, "未知のエラーです。ごめんなさい");
		}
	}
}) satisfies PageServerLoad;
