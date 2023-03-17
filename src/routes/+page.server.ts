import type { blogContent } from '$lib/types/blogContent';
import { notionAdaptor } from '$lib/utils/adaptor/notionAdaptor';
import type { PageServerLoad } from './$types';
type infoType={
	[key: string]: string;
}
type dataType = {
	info: infoType;
	blog: blogContent[];
	accessCounterValue: string;
};

export const load = (async ({ platform }) => {

	//
	/**
	 * cloudflare workers kv からアクセスカウンタの値を引っ張る
	 */
	let nOfVisitorValue = 'むげん';//ローカルでは使えないのでこの値を出す
	if (platform !== undefined && platform.env !== undefined) {
		const counter: string = await platform.env.KV.get('counter');
		const nOfVisitor = Number(counter) + 1;
		//アクセスカウンタ増やす(リロードで増えてしまうが、IPとか取って判定厳密にするの大変なので後回し。現実的にはクッキー見て判定とかが良さそう)
		await platform.env.KV.put('counter', nOfVisitor);
		nOfVisitorValue = nOfVisitor.toString();
	}
	
	/**
	 * トップ用のデータ取得
	 */
	const response = await notionAdaptor.databases.query({
		database_id: 'b8ec3c117d1b4677947153bbe44bd42d'
	});
	const dataInfo: infoType = {};
	response.results.forEach((row: any) => {
		dataInfo[row.properties.key.title[0].plain_text] =
			row.properties.value.rich_text[0].plain_text;
	});
	
	return { info: dataInfo, blog: [], accessCounterValue: nOfVisitorValue };
}) satisfies PageServerLoad;
