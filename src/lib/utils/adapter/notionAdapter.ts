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

// Cache TTL (Time To Live) constants in seconds
// Long TTL to minimize KV writes (1000 writes/day limit)
const DEFAULT_CACHE_TTL = 21600; // 6 hours
const DATA_SOURCE_CACHE_TTL = 604800; // 7 days for data source IDs

// Export TTL constants for different Notion database APIs
export const CACHE_TTL = {
	// Info database (basic site information)
	INFO_DB: 43200, // 12 hours
	// About database
	ABOUT_DB: 86400, // 24 hours
	// Tech stack database
	TECH_STACK_DB: 43200, // 12 hours
	// History database
	HISTORY_DB: 86400, // 24 hours
	// Links database
	LINKS_DB: 21600, // 6 hours
	// Kokosuki database
	KOKOSUKI_DB: 86400, // 24 hours
	// Programming works database (short TTL due to Notion file URL expiration)
	PROGRAMMING_WORKS_DB: 1800, // 30 minutes
	// Slides database
	SLIDES_DB: 14400, // 4 hours
	// Videos database
	VIDEOS_DB: 14400, // 4 hours
	// Individual page retrieval (short TTL due to Notion file URL expiration)
	PAGE_RETRIEVE: 1800, // 30 minutes
	// Default fallback
	DEFAULT: DEFAULT_CACHE_TTL,
} as const;

export const getNotionClient = (fetch?: typeof globalThis.fetch) => {
	return new Client({
		auth: NOTION_API_KEY,
		fetch: fetch?.bind(globalThis),
	});
};

// JSON.stringifyのreplacer配列はネストしたキーまで絞り込みキーが衝突するため、自前でソートする
const sortObjectKeys = (value: unknown): unknown => {
	if (Array.isArray(value)) {
		return value.map(sortObjectKeys);
	}
	if (value !== null && typeof value === "object") {
		const source = value as Record<string, unknown>;
		return Object.keys(source)
			.sort()
			.reduce<Record<string, unknown>>((acc, key) => {
				acc[key] = sortObjectKeys(source[key]);
				return acc;
			}, {});
	}
	return value;
};

// Generate cache key for Notion API requests
export const generateCacheKey = (
	prefix: string,
	params: Record<string, unknown>,
): string => {
	const paramsString = JSON.stringify(sortObjectKeys(params));
	// btoaはLatin-1しか扱えないためUTF-8バイト列に変換する
	const latin1 = Array.from(new TextEncoder().encode(paramsString), (byte) =>
		String.fromCharCode(byte),
	).join("");
	// Use btoa for base64 encoding in browser/Worker environment
	return `notion:${prefix}:${btoa(latin1)}`;
};

// data_sources取得失敗時のフォールバック値(databaseId)はクエリが404になるため弾く
export const isValidDataSourceId = (
	dataSourceId: string,
	databaseId: string,
): boolean => {
	if (!dataSourceId) {
		return false;
	}
	const normalize = (id: string) => id.replace(/-/g, "").toLowerCase();
	return normalize(dataSourceId) !== normalize(databaseId);
};

// 非公開ページを載せると公開に切り替えてもTTLが切れるまで403を返し続けるため弾く
export const shouldCachePage = (response: unknown): boolean => {
	if (response === null || typeof response !== "object") {
		return false;
	}
	const properties = (response as { properties?: Record<string, unknown> })
		.properties;
	const isPublished = (
		properties?.isPublished as { checkbox?: unknown } | undefined
	)?.checkbox;
	return isPublished === true;
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
			// 旧実装が書き込んだフォールバック値は無視してAPIから引き直す
			if (cached && isValidDataSourceId(cached, databaseId)) {
				console.log(`KV cache hit for data source: ${databaseId}`);
				return cached;
			}
			if (cached) {
				console.warn(
					`Ignoring invalid cached data source for ${databaseId} (fallback value was cached)`,
				);
			}
		} catch (error) {
			console.warn(`KV cache read failed for ${cacheKey}:`, error);
		}
	}

	// Check in-memory cache second
	const memoryCachedId = dataSourceCache.get(databaseId);
	if (memoryCachedId && isValidDataSourceId(memoryCachedId, databaseId)) {
		return memoryCachedId;
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
			// キャッシュすると次回以降もAPIを叩かず404を出し続けるため載せない
			return databaseId;
		}
	} catch (error) {
		console.warn(
			`Failed to get data source for database ${databaseId}, using database_id as fallback:`,
			error,
		);
		// 一時障害をキャッシュすると復旧後もTTLが切れるまで404が続くため載せない
		return databaseId;
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
				console.log(
					`KV cache stored for query: ${databaseId} (TTL: ${cacheTtl || DEFAULT_CACHE_TTL}s)`,
				);
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
