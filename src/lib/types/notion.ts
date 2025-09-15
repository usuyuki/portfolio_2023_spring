// Notion API response types to replace 'any' usage

export interface NotionTitleProperty {
	title: { plain_text: string }[];
}

export interface NotionRichTextProperty {
	rich_text: { plain_text: string }[];
}

export interface NotionSelectProperty {
	select: {
		name: string;
		id: string;
	};
}

export interface NotionMultiSelectProperty {
	multi_select: {
		name: string;
		id: string;
	}[];
}

export interface NotionDateProperty {
	date: {
		start: string;
	};
}

export interface NotionCheckboxProperty {
	checkbox: boolean;
}

export interface NotionFileProperty {
	files: {
		file: {
			url: string;
		};
	}[];
}

export interface NotionDatabaseRow {
	id: string;
	properties: {
		[key: string]: unknown; // Properties are dynamic, but we'll type specific ones below
	};
}

// Specific property interfaces for common patterns
export interface InfoDatabaseRow extends NotionDatabaseRow {
	properties: {
		key: NotionTitleProperty;
		value: NotionRichTextProperty;
	};
}

export interface WorksProgrammingRow extends NotionDatabaseRow {
	properties: {
		name: NotionTitleProperty;
		publishedAt: NotionDateProperty;
		isPublished: NotionCheckboxProperty;
		genre: NotionSelectProperty;
		form: NotionSelectProperty;
		toWhom: NotionRichTextProperty;
		whatToOffer: NotionRichTextProperty;
		background: NotionRichTextProperty;
		kodawari: NotionRichTextProperty;
		kana: NotionRichTextProperty;
		summary: NotionRichTextProperty;
		tech: NotionMultiSelectProperty;
		gallery: NotionFileProperty;
		logo: NotionFileProperty;
		link: { url: string | null };
		gitHub: { url: string | null };
		content: NotionRichTextProperty;
	};
}

export interface GenericDatabaseRow extends NotionDatabaseRow {
	properties: {
		name: NotionTitleProperty;
		content?: NotionRichTextProperty;
		description?: NotionRichTextProperty;
		genre?: NotionSelectProperty;
		date?: NotionDateProperty & { date: { start: string; end?: string } };
		publishedAt?: NotionDateProperty;
		url?: { url: string };
		slideIframe?: { url: string };
		power?: { number: number };
		[key: string]: unknown;
	};
}

export interface VideoDatabaseRow extends NotionDatabaseRow {
	properties: {
		publishedAt: NotionDateProperty;
		name: NotionTitleProperty;
		description: NotionRichTextProperty;
		youTubeIframe: { url: string };
		thumbnail: NotionFileProperty;
	};
}

export interface NotionDatabaseResponse<T = NotionDatabaseRow> {
	results: T[];
}

// New types for 2025-09-03 API upgrade
export interface NotionDataSource {
	id: string;
	name: string;
	type: string;
}

export interface NotionDatabaseInfo {
	id: string;
	title: NotionTitleProperty[];
	data_sources?: NotionDataSource[];
}
