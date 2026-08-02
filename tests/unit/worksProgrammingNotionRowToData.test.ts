import { describe, expect, it } from "vitest";
import type { WorksProgrammingRow } from "$lib/types/notion";
import { notionRowToData } from "../../src/routes/works/programming/[id]/+page.server";

// テストで使い回す最小限のNotionレスポンス。各テストケースでpropertiesを部分的に上書きする
const baseRow: WorksProgrammingRow = {
	id: "page-id-1",
	properties: {
		name: { title: [{ plain_text: "テスト作品" }] },
		publishedAt: { date: { start: "2026-01-15" } },
		isPublished: { checkbox: true },
		genre: { select: { name: "Web", id: "genre-1" } },
		form: { select: { name: "個人開発", id: "form-1" } },
		toWhom: { rich_text: [{ plain_text: "誰向け" }] },
		whatToOffer: { rich_text: [{ plain_text: "提供価値" }] },
		background: { rich_text: [{ plain_text: "背景" }] },
		kodawari: { rich_text: [{ plain_text: "こだわり" }] },
		kana: { rich_text: [{ plain_text: "てすとさくひん" }] },
		summary: { rich_text: [{ plain_text: "概要" }] },
		tech: { multi_select: [{ name: "TypeScript", id: "tech-1" }] },
		gallery: { files: [{ file: { url: "https://example.com/gallery1.png" } }] },
		logo: { files: [{ file: { url: "https://example.com/logo.png" } }] },
		link: { url: "https://example.com" },
		gitHub: { url: "https://github.com/example/repo" },
		content: { rich_text: [{ plain_text: "本文" }] },
	},
};

describe("notionRowToData", () => {
	it("正常系: 全フィールドが揃ったNotionレスポンスを渡すと、worksProgrammingType形式に変換される", () => {
		const result = notionRowToData(baseRow);
		expect(result).toEqual({
			slug: "page-id-1",
			background: "背景",
			content: "本文",
			tech: [{ name: "TypeScript", id: "tech-1" }],
			logo: "https://example.com/logo.png",
			gitHub: "https://github.com/example/repo",
			link: "https://example.com",
			summary: "概要",
			whatToOffer: "提供価値",
			genre: { name: "Web", id: "genre-1" },
			publishedAt: "2026/01/15",
			toWhom: "誰向け",
			form: { name: "個人開発", id: "form-1" },
			kodawari: "こだわり",
			kana: "てすとさくひん",
			gallery: ["https://example.com/gallery1.png"],
			name: "テスト作品",
		});
	});

	it("異常系: contentのrich_textが空配列だと、contentがnullになる", () => {
		const row: WorksProgrammingRow = {
			...baseRow,
			properties: { ...baseRow.properties, content: { rich_text: [] } },
		};
		const result = notionRowToData(row);
		expect(result.content).toBeNull();
	});

	it("異常系: logoのfilesが空配列だと、logoがfalseになる", () => {
		const row: WorksProgrammingRow = {
			...baseRow,
			properties: { ...baseRow.properties, logo: { files: [] } },
		};
		const result = notionRowToData(row);
		expect(result.logo).toBe(false);
	});

	it("正常系: publishedAtのハイフンがスラッシュに変換される", () => {
		const row: WorksProgrammingRow = {
			...baseRow,
			properties: {
				...baseRow.properties,
				publishedAt: { date: { start: "2026-08-02" } },
			},
		};
		const result = notionRowToData(row);
		expect(result.publishedAt).toBe("2026/08/02");
	});

	it("正常系: galleryが複数枚あると、全件分のURLが配列で返る", () => {
		const row: WorksProgrammingRow = {
			...baseRow,
			properties: {
				...baseRow.properties,
				gallery: {
					files: [
						{ file: { url: "https://example.com/1.png" } },
						{ file: { url: "https://example.com/2.png" } },
					],
				},
			},
		};
		const result = notionRowToData(row);
		expect(result.gallery).toEqual([
			"https://example.com/1.png",
			"https://example.com/2.png",
		]);
	});
});
