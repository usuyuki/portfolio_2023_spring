import { Client } from "@notionhq/client";
import { NOTION_API_KEY } from "$env/static/private";

// Cache for data source IDs to avoid repeated API calls
const dataSourceCache = new Map<string, string>();

export const getNotionClient = (fetch?: typeof globalThis.fetch) => {
	return new Client({
		auth: NOTION_API_KEY,
		fetch: fetch?.bind(globalThis),
	});
};

// Get data source ID for a given database ID
export const getDataSourceId = async (
	databaseId: string,
	fetch?: typeof globalThis.fetch,
): Promise<string> => {
	// Check cache first
	if (dataSourceCache.has(databaseId)) {
		return dataSourceCache.get(databaseId)!;
	}

	const client = getNotionClient(fetch);

	try {
		const database = await client.databases.retrieve({
			database_id: databaseId,
		});

		// In the new API, databases have data_sources array
		// For most cases, we'll use the first data source
		const dataSourceId = (database as any).data_sources?.[0]?.id;

		if (dataSourceId) {
			// Cache the result
			dataSourceCache.set(databaseId, dataSourceId);
			return dataSourceId;
		} else {
			// For databases without explicit data sources, use database_id as data_source_id
			console.info(
				`No data sources found for database ${databaseId}, using database_id as data_source_id`,
			);
			dataSourceCache.set(databaseId, databaseId);
			return databaseId;
		}
	} catch (error) {
		console.warn(
			`Failed to get data source for database ${databaseId}, using database_id as fallback:`,
			error,
		);
		// Fallback to database_id
		dataSourceCache.set(databaseId, databaseId);
		return databaseId;
	}
};

// Helper function to query data source with automatic data source ID resolution
export const queryDataSource = async (
	databaseId: string,
	queryOptions: any,
	fetch?: typeof globalThis.fetch,
) => {
	const client = getNotionClient(fetch);
	const dataSourceId = await getDataSourceId(databaseId, fetch);

	try {
		// Use new dataSources API
		return await client.dataSources.query({
			data_source_id: dataSourceId,
			...queryOptions,
		});
	} catch (error) {
		console.error(`Data source query failed for ${dataSourceId}:`, error);
		throw error;
	}
};
