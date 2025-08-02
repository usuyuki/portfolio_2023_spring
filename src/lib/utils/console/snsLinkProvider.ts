export const snsLinkProvider = () => {
	// console.logの結果をおしゃれに出すスタイル
	// Cloudflare Workersでのillegal invocation回避のため.bind(console)を使用
	const log = console.log.bind(console);
	log(
		"%cX(旧Twitter)%chttps://twitter.com/usuyuki26%c\n%cMisskey%chttps://m5y.usuyuki.net/@usuyuki%c\n%cGitHub%chttps://github.com/usuyuki",
		"background: #1da1f2; color: white;padding: 0.25rem 0.25rem;",
		"background: black; color: white;padding: 0.25rem 0.25rem;",
		"",
		"margin-top:4px;background: #739900; color: white;padding: 0.25rem 0.25rem;",
		"margin-top:4px;background: black; color: white;padding: 0.25rem 0.25rem;",
		"",
		"margin-top:4px;background: #7e44c4; color: white;padding: 0.25rem 0.25rem;",
		"margin-top:4px;background: black; color: white;padding: 0.25rem 0.25rem;",
	);
};
