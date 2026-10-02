const PLAYER_URL_PATTERN = /^https:\/\/speakerdeck\.com\/player\/([0-9a-f]+)/;

// 非公式だが、プレイヤー自身が読み込む表紙画像と同じURL規則に従っている
export function speakerDeckThumbnail(playerUrl: string): string | null {
	const id = playerUrl.match(PLAYER_URL_PATTERN)?.[1];
	if (!id) return null;
	return `https://files.speakerdeck.com/presentations/${id}/preview_slide_0.jpg`;
}
