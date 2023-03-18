import { notionAdapter } from '$lib/utils/adapter/notionAdapter';

const data = await notionAdapter.databases.query({
	database_id: 'd773ca5cc7a14127b45b902d6129a321'
});

export default data;
