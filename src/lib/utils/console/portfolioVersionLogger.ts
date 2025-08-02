export const portfolioVersionLogger = () => {
	// console.logの結果をおしゃれに出すスタイル
	// Cloudflare Workersでのillegal invocation回避のため.bind(console)を使用
	const log = console.log.bind(console);
	log(
		"%cusuyuki portfolio🌂%c\n%cversion:6%cPowered By usuyuki",
		"background: white; color: gray; border-radius:2px; font-size: 1.1rem;padding: 0.25rem 0.25rem;",
		"",
		"border-left:0.4rem solid pink;background: mediumslateblue; color: white;margin-top:0.5rem; border-radius:2px; padding: 0.25rem 0.25rem;",
		"border-left:0.4rem solid pink;margin-left:0.25rem;background: aquamarine; color: black;margin-top:0.5rem; border-radius:2px; padding: 0.25rem 0.25rem;font-family:'Kiwi Maru';",
	);
};
