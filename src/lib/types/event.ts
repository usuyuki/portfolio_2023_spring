export type eventType = {
	// /events/{slug} のディレクトリ名と一致させる
	slug: string;
	name: string;
	// YYYY/MM/DD形式。単日開催ならendDateはnull
	startDate: string;
	endDate: string | null;
	// static/img/events/配下のパス。nullならプレースホルダー表示
	thumbnail: string | null;
};

export type eventSection = {
	hero: eventType | null;
	upcoming: eventType[];
	past: eventType[];
};
