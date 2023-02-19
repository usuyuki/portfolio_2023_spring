import { Client } from '@notionhq/client';
import { NOTION_API_KEY } from '$env/static/private';
const notion = new Client({
	auth: NOTION_API_KEY
});

const data = await notion.databases.query({
	database_id: 'd773ca5cc7a14127b45b902d6129a321'
});

export default data;
