// Opening演出(オープニングロゴ〜斜め帯ワイプアウト)のオーバーレイがフェードアウトし始めた瞬間にdocumentへdispatchされるイベント名。
// AccessCounter/MisskeyRecentNotes/SNSMenu等、オープニング完了後に登場する演出はこのイベントを購読して開始する。
// フェードアウト完了を待たずに発火することで、黒画面の間延びなくクロスフェードさせる
// (以前は--opening-time等CSS変数の値をJS側にハードコード複製しており、ページ読み込みが遅いと実際の完了とズレていた)
export const OPENING_FINISHED_EVENT = "opening:finished";

// セッション内で既にOpeningを再生済み(=スキップされる)かどうか。Opening.svelte側の判定と共有する
export const OPENING_SESSION_KEY = "opening-played";

export const hasOpeningAlreadyPlayed = () =>
	typeof window !== "undefined" &&
	!!window.sessionStorage.getItem(OPENING_SESSION_KEY);

// Opening演出の完了を待って処理を実行する。既に再生済み(sessionStorage済み)なセッションでは
// オープニング自体が表示されずイベントも発火しないため、即座にコールバックを実行する
export const onOpeningFinished = (callback: () => void): (() => void) => {
	if (typeof document === "undefined") return () => {};
	if (hasOpeningAlreadyPlayed()) {
		callback();
		return () => {};
	}
	const handler = () => callback();
	document.addEventListener(OPENING_FINISHED_EVENT, handler, { once: true });
	return () => document.removeEventListener(OPENING_FINISHED_EVENT, handler);
};
