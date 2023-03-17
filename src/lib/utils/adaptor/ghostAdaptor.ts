import { GHOST_API_URL, GHOST_CONTENT_KEY } from '$env/static/private';
import GhostContentAPI from '@tryghost/content-api';

// Create API instance with site credentials
export const ghostAdaptor = new GhostContentAPI({
	url: GHOST_API_URL,
	key: GHOST_CONTENT_KEY,
	version: 'v5.0'
});
