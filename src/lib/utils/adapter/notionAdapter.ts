import { Client } from "@notionhq/client";
import { NOTION_API_KEY } from "$env/static/private";

export const getNotionClient = (fetch?: typeof globalThis.fetch) => {
	return new Client({
		auth: NOTION_API_KEY,
		fetch: fetch?.bind(globalThis),
	});
};
