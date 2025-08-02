import GhostContentAPI from "@tryghost/content-api";
import { GHOST_API_URL, GHOST_CONTENT_KEY } from "$env/static/private";

// Create API instance with site credentials
export const ghostAdapter = new GhostContentAPI({
	url: GHOST_API_URL,
	key: GHOST_CONTENT_KEY,
	version: "v5.0",
});
