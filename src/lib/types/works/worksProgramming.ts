export type worksProgrammingTopPageType = {
	id: string;
	name: string;
	thumbnail: string;
	publishedAt: string;
};
export type worksProgrammingShortType = {
	name: string;
	summary: string;
	thumbnail: string;
	publishedAt: string;
	logo: string | false;
};
// +layout.server.tsで全作品を一括取得する際に、個別ページ用の全フィールドも一緒に持たせておくための型。
// これにより[id]/+page.server.tsが個別にNotion pages.retrieveを呼ぶ必要がなくなる。
export type worksProgrammingFullType = worksProgrammingShortType & {
	slug: string;
	background: string;
	content: string | null;
	tech: {
		name: string;
		id: string;
	}[];
	gitHub: string | null;
	link: string | null;
	whatToOffer: string;
	genre: {
		name: string;
		id: string;
	};
	toWhom: string;
	form: {
		name: string;
		id: string;
	};
	kodawari: string;
	kana: string;
	gallery: string[];
	isPublished: boolean;
};
export type worksProgrammingType = {
	slug: string;
	background: string;
	content: string | null;
	tech: {
		name: string;
		id: string;
	}[];
	// ファイル&メディアは入ってないとNotionの返り値は空配列になる
	logo: string | false;
	// URLは入ってないとNotionの返り値はnullになる
	gitHub: string | null;
	link: string | null;
	summary: string;
	whatToOffer: string;
	genre: {
		name: string;
		id: string;
	};
	publishedAt: string;
	toWhom: string;
	form: {
		name: string;
		id: string;
	};
	kodawari: string;
	kana: string;
	gallery: string[];
	name: string;
};
