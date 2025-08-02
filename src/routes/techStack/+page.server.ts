import type {
	GenericDatabaseRow,
	NotionDatabaseResponse,
} from "$lib/types/notion";
import type { techStackType } from "$lib/types/techStack";
import { getNotionClient } from "$lib/utils/adapter/notionAdapter";
import type { PageServerLoad } from "./$types";

// ジャンルごとに ジャンル:データ となるようにしている
type dataType = {
	data: {
		[key: string]: techStackType[];
	};
};

export const load = (async ({ platform, fetch }) => {
	const response = (await getNotionClient(
		platform?.fetch || fetch,
	).databases.query({
		database_id: "b0f7969c8fc245928e4c2abaa8a2f578",
		filter: {
			or: [
				{
					property: "isPublished",
					checkbox: {
						equals: true,
					},
				},
			],
		},
		sorts: [
			{
				property: "updatedAt",
				direction: "descending",
			},
		],
	})) as unknown as NotionDatabaseResponse<GenericDatabaseRow>;

	const data: dataType = { data: {} };
	response.results.forEach((row: GenericDatabaseRow) => {
		const genre: string = row.properties.genre?.select.name || "";
		const techArray: techStackType = {
			name: row.properties.name.title[0].plain_text,
			content: row.properties.content?.rich_text[0].plain_text || "",
			power: row.properties.power?.number || 0,
		};
		if (genre in data.data) {
			data.data[genre].push(techArray);
		} else {
			data.data[genre] = [techArray];
		}
	});
	return data;
}) satisfies PageServerLoad;
