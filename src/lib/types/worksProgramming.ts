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
export type worksProgrammingType = {
	background: string;
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
