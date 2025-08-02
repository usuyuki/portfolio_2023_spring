import { Client } from "@notionhq/client";
import { NOTION_API_KEY } from "$env/static/private";

export const notionAdapter = new Client({
	auth: NOTION_API_KEY,
});
