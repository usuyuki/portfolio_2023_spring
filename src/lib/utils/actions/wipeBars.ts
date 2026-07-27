import gsap from "gsap";

// skewX(-12deg)の帯は縦位置によって左右にずれた平行四辺形になるため、
// 矩形換算の幅(100vw)だけでなく高さ×tan(12deg)相当の余裕を上乗せした待避距離にしておく
// (実装上の目安として仕様書が指定する160vwをそのまま採用)
export const WIPE_BARS_OFFSCREEN_X = "160vw";

const prefersReducedMotion = () =>
	typeof window !== "undefined" &&
	window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// 帯を画面外(右)から中央へスライドインさせ、画面全体を覆う(オープニング退場・シーンチェンジ共通)
export const coverWithBars = (bars: HTMLElement[], onCovered?: () => void) => {
	if (prefersReducedMotion()) {
		gsap.set(bars, { x: "0vw" });
		onCovered?.();
		return;
	}
	gsap.to(bars, {
		x: "0vw",
		duration: 0.75,
		ease: "power3.out",
		onComplete: onCovered,
	});
};

// 覆った帯をさらに左へ抜けさせ、次回に備えて右端(画面外)へリセットする
export const revealFromBars = (bars: HTMLElement[], onRevealed?: () => void) => {
	if (prefersReducedMotion()) {
		gsap.set(bars, { x: `-${WIPE_BARS_OFFSCREEN_X}` });
		gsap.set(bars, { x: WIPE_BARS_OFFSCREEN_X });
		onRevealed?.();
		return;
	}
	gsap.to(bars, {
		x: `-${WIPE_BARS_OFFSCREEN_X}`,
		duration: 0.84,
		ease: "power3.out",
		onComplete: () => {
			gsap.set(bars, { x: WIPE_BARS_OFFSCREEN_X });
			onRevealed?.();
		},
	});
};
