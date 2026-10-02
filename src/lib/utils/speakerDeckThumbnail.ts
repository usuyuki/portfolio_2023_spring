// プレイヤーURL(https://speakerdeck.com/player/{id})からスライドのIDを取り出す
const PLAYER_URL_PATTERN = /^https:\/\/speakerdeck\.com\/player\/([0-9a-f]+)/;

// Speaker DeckのプレイヤーURLから、表紙のサムネイル画像(640x360)のURLを作る
// 公式APIではないが、プレイヤー自身が読み込んでいる画像と同じURL規則に従っている
export function speakerDeckThumbnail(playerUrl: string): string | null {
	const id = playerUrl.match(PLAYER_URL_PATTERN)?.[1];
	if (!id) return null;
	return `https://files.speakerdeck.com/presentations/${id}/preview_slide_0.jpg`;
}
