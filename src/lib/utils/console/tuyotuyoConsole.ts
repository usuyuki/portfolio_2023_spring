export const tuyotuyoConsole = (string: string) => {
	// console.logの結果をおしゃれに出すスタイル
	const style =
		"border-radius:4px;border:2px dotted pink;margin:0.25rem;padding:1.5rem 1rem;font-family:'Kiwi Maru';text-shadow: #FC0 1px 0 10px;";
	console.log('%c' + string, style);
};
