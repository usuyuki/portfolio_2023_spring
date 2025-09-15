import { Client } from "@notionhq/client";
import { NOTION_API_KEY } from "$env/static/private";

// Cache for data source IDs to avoid repeated API calls
const dataSourceCache = new Map<string, string>();

// KV Cache interface for Cloudflare Workers
interface KVCache {
	get(
		key: string,
		options?: { type?: "text" | "json" | "arrayBuffer" | "stream" },
	): Promise<string | null>;
	put(
		key: string,
		value: string | ArrayBuffer | ReadableStream,
		options?: {
			expirationTtl?: number;
			expiration?: number;
			metadata?: object;
		},
	): Promise<void>;
}

// Default cache TTL (Time To Live) in seconds
const DEFAULT_CACHE_TTL = 3600; // 1 hour
const DATA_SOURCE_CACHE_TTL = 86400; // 24 hours for data source IDs

export const getNotionClient = (fetch?: typeof globalThis.fetch) => {
	return new Client({
		auth: NOTION_API_KEY,
		fetch: fetch?.bind(globalThis),
	});
};

// Generate cache key for Notion API requests
const generateCacheKey = (
	prefix: string,
	params: Record<string, unknown>,
): string => {
	const paramsString = JSON.stringify(params, Object.keys(params).sort());
	// Use btoa for base64 encoding in browser/Worker environment
	return `notion:${prefix}:${btoa(paramsString)}`;
};

// Get data source ID for a given database ID with KV caching
export const getDataSourceId = async (
	databaseId: string,
	fetch?: typeof globalThis.fetch,
	kv?: KVCache,
): Promise<string> => {
	const cacheKey = `notion:datasource:${databaseId}`;

	// Check KV cache first
	if (kv) {
		try {
			const cached = await kv.get(cacheKey);
			if (cached) {
				console.log(`KV cache hit for data source: ${databaseId}`);
				return cached;
			}
		} catch (error) {
			console.warn(`KV cache read failed for ${cacheKey}:`, error);
		}
	}

	// Check in-memory cache second
	if (dataSourceCache.has(databaseId)) {
		const cachedId = dataSourceCache.get(databaseId);
		if (cachedId) {
			return cachedId;
		}
	}

	const client = getNotionClient(fetch);

	try {
		const database = await client.databases.retrieve({
			database_id: databaseId,
		});

		// In the new API, databases have data_sources array
		// For most cases, we'll use the first data source
		const dataSourceId = (database as { data_sources?: Array<{ id: string }> })
			.data_sources?.[0]?.id;

		if (dataSourceId) {
			// Cache the result in both stores
			dataSourceCache.set(databaseId, dataSourceId);
			if (kv) {
				try {
					await kv.put(cacheKey, dataSourceId, {
						expirationTtl: DATA_SOURCE_CACHE_TTL,
					});
					console.log(`KV cache stored for data source: ${databaseId}`);
				} catch (error) {
					console.warn(`KV cache write failed for ${cacheKey}:`, error);
				}
			}
			return dataSourceId;
		} else {
			// For databases without explicit data sources, use database_id as data_source_id
			console.info(
				`No data sources found for database ${databaseId}, using database_id as data_source_id`,
			);
			const fallbackId = databaseId;
			dataSourceCache.set(databaseId, fallbackId);
			if (kv) {
				try {
					await kv.put(cacheKey, fallbackId, {
						expirationTtl: DATA_SOURCE_CACHE_TTL,
					});
				} catch (error) {
					console.warn(`KV cache write failed for ${cacheKey}:`, error);
				}
			}
			return fallbackId;
		}
	} catch (error) {
		console.warn(
			`Failed to get data source for database ${databaseId}, using database_id as fallback:`,
			error,
		);
		// Fallback to database_id
		const fallbackId = databaseId;
		dataSourceCache.set(databaseId, fallbackId);
		if (kv) {
			try {
				await kv.put(cacheKey, fallbackId, {
					expirationTtl: DATA_SOURCE_CACHE_TTL,
				});
			} catch (error) {
				console.warn(`KV cache write failed for ${cacheKey}:`, error);
			}
		}
		return fallbackId;
	}
};

// Helper function to query data source with automatic data source ID resolution and KV caching
export const queryDataSource = async (
	databaseId: string,
	queryOptions: Record<string, unknown>,
	fetch?: typeof globalThis.fetch,
	kv?: KVCache,
	cacheTtl?: number,
) => {
	const cacheKey = generateCacheKey("query", { databaseId, ...queryOptions });

	// Check KV cache first
	if (kv) {
		try {
			const cached = await kv.get(cacheKey, { type: "json" });
			if (cached) {
				console.log(`KV cache hit for query: ${databaseId}`);
				return cached;
			}
		} catch (error) {
			console.warn(`KV cache read failed for ${cacheKey}:`, error);
		}
	}

	const client = getNotionClient(fetch);
	const dataSourceId = await getDataSourceId(databaseId, fetch, kv);

	try {
		// Use new dataSources API
		const result = await client.dataSources.query({
			data_source_id: dataSourceId,
			...queryOptions,
		});

		// Cache the result in KV
		if (kv) {
			try {
				await kv.put(cacheKey, JSON.stringify(result), {
					expirationTtl: cacheTtl || DEFAULT_CACHE_TTL,
				});
				console.log(`KV cache stored for query: ${databaseId} (TTL: ${cacheTtl || DEFAULT_CACHE_TTL}s)`);
			} catch (error) {
				console.warn(`KV cache write failed for ${cacheKey}:`, error);
			}
		}

		return result;
	} catch (error) {
		console.error(`Data source query failed for ${dataSourceId}:`, error);
		throw error;
	}
};

// Cached version of queryDataSource with configurable TTL
export const queryDataSourceCached = async (
	databaseId: string,
	queryOptions: Record<string, unknown>,
	options?: {
		fetch?: typeof globalThis.fetch;
		kv?: KVCache;
		cacheTtl?: number;
	},
) => {
	return queryDataSource(
		databaseId,
		queryOptions,
		options?.fetch,
		options?.kv,
		options?.cacheTtl,
	);
};
