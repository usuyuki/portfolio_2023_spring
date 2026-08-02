// 個別のページでも全体のデータ使いたいので+layout.server.tsで取得

import { APIErrorCode } from "@notionhq/client";
import { error } from "@sveltejs/kit";
import type { WorksProgrammingRow } from "$lib/types/notion";
import type { worksProgrammingType } from "$lib/types/works/worksProgramming";
import { CACHE_TTL, getNotionClient } from "$lib/utils/adapter/notionAdapter";
import type { PageServerLoad } from "./$types";

// id:データになっている
type dataType = {
	data: worksProgrammingType;
};

export const notionRowToData = (
	response: WorksProgrammingRow,
): worksProgrammingType => ({
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
	publishedAt: response.properties.publishedAt.date.start.replace(/-/g, "/"),
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
});

export const load = (async ({ params, platform, fetch, parent }) => {
	// +layout.server.tsが一覧取得時に個別ページの全フィールドも一緒に持ってきているため、
	// そこにヒットすればNotionへの追加リクエスト(pages.retrieve)を省略できる
	// parent()はlayout側のNotionクエリ完了を待つため、KVキャッシュ読み取りと並列に走らせて待ち時間を短縮する
	const cacheKey = `notion:page:${params.id}`;
	const cachedPromise =
		platform?.env?.KV != null
			? platform.env.KV.get(cacheKey, { type: "json" }).catch(
					(cacheError: unknown) => {
						console.warn(`KV cache read failed for ${cacheKey}:`, cacheError);
						return null;
					},
				)
			: Promise.resolve(null);

	const [{ allWorks }, cached] = await Promise.all([parent(), cachedPromise]);
	const fromLayout = allWorks[params.id];
	if (fromLayout) {
		// allWorksはisPublished=trueのみを抽出したクエリ結果から作られるため、
		// ここに存在する時点で必ずisPublished===trueであり、この分岐は理論上通らない
		const {
			thumbnail: _thumbnail,
			isPublished: _isPublished,
			...data
		} = fromLayout;
		return { data } satisfies dataType;
	}

	// layoutのデータに無いid(非公開ページの直接アクセスなど)の場合のみ、
	// Notionへ個別に問い合わせるフォールバック
	if (cached) {
		const response = cached as WorksProgrammingRow;
		if (!response.properties.isPublished.checkbox) {
			error(403);
		}
		return { data: notionRowToData(response) } satisfies dataType;
	}

	try {
		const response = (await getNotionClient(
			platform?.fetch || fetch,
		).pages.retrieve({
			page_id: params.id,
		})) as unknown as WorksProgrammingRow;

		if (platform?.env?.KV) {
			try {
				await platform.env.KV.put(cacheKey, JSON.stringify(response), {
					expirationTtl: CACHE_TTL.PAGE_RETRIEVE,
				});
			} catch (cacheError) {
				console.warn(`KV cache write failed for ${cacheKey}:`, cacheError);
			}
		}
		// publishしてない記事を弾く
		if (!response.properties.isPublished.checkbox) {
			error(403);
			//処理はtry catchのcatchで続く
		}
		return { data: notionRowToData(response) } satisfies dataType;
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
