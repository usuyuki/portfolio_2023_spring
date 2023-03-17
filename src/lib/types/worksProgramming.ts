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
	logo: string | false;
	gitHub: string;
	link: string;
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
