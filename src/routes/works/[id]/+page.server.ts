// 個別のページでも全体のデータ使いたいので+layout.server.tsで取得
import { NOTION_API_KEY } from '$env/static/private';
import { Client } from '@notionhq/client';
import type { PageServerLoad } from './$types';
// id:データになっている
type dataType = {
	data: {
		background:string,
		tech:{
			name:string,
			id:string,
		}[],
		thumbnail:string,
		gitHub:string,
		link:string,
		whatToOffer:string,
		genre:{
			name:string,
			id:string,
		},
		publishedAt:string,
		toWhom:string,
		form:{
			name:string,
			id:string,
		},
		kodawari:string,
		kana:string,
		gallery:string[],
		name:string,
		
	};
};
export const load = (async (params) => {
	const notion = new Client({
		auth: NOTION_API_KEY
	});
	const response = await notion.pages.retrieve({
		page_id: params.params.id,
		filter: {
			and: [
				{
					property: 'isPublished',
					checkbox: {
						equals: true
					}
				},
			]
		},
	})
	const data: dataType = { data: {
		background:response.properties.background.rich_text[0].plain_text,
		tech:response.properties.tech.multi_select.map((item:any)=>{return {name:item.name,id:item.id}}),
		thumbnail:response.properties.thumbnail.files[0].file.url,
		gitHub:response.properties.gitHub.url,
		link:response.properties.link.url,
		whatToOffer:response.properties.whatToOffer.rich_text[0].plain_text,
		genre:{name:response.properties.genre.select.name,id:response.properties.genre.select.id},
		publishedAt:response.properties.publishedAt.date.start.replace(/-/g, '/'),
		toWhom:response.properties.toWhom.rich_text[0].plain_text,
		form:{name:response.properties.form.select.name,id:response.properties.form.select.id},
		kodawari:response.properties.kodawari.rich_text[0].plain_text,
		kana:response.properties.kana.rich_text[0].plain_text,
		gallery:response.properties.gallery.files.map((item:any)=>{return item.file.url}),
		name:response.properties.name.title[0].plain_text,
	} };
	console.log(data)
	return data;
}) satisfies PageServerLoad;
