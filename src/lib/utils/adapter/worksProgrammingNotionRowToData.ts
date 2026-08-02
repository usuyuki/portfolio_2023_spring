import type { WorksProgrammingRow } from "$lib/types/notion";
import type { worksProgrammingType } from "$lib/types/works/worksProgramming";

// Notionのpages.retrieveレスポンスをworksProgrammingType形式に変換する
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
