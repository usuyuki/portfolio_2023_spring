export const tuyotuyoConsole = (string: string) => {
	// console.logの結果をおしゃれに出すスタイル
	const style = "margin:2rem 0;font-weight:bold;font-family:'Kiwi Maru;";
	console.log('%c' + string, style);
};
