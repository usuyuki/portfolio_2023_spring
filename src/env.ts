import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
	GHOST_API_URL: { static: true },
	GHOST_CONTENT_KEY: { static: true },
	NOTION_API_KEY: { static: true },
});
