import { notionAdaptor } from '$lib/utils/adaptor/notionAdaptor';

const data = await notionAdaptor.databases.query({
	database_id: 'd773ca5cc7a14127b45b902d6129a321'
});

export default data;
