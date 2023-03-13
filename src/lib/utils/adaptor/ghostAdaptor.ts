import GhostContentAPI from '@tryghost/content-api';

// Create API instance with site credentials
export const ghostAdaptor = new GhostContentAPI({
	url: import.meta.env.GHOST_API_URL,
	key: import.meta.env.GHOST_CONTENT_KEY,
	version: 'v5.0'
});
