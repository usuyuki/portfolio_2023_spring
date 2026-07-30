// OS側で「視差効果を減らす」等の設定がされている場合はスケール/演出アニメーションを無効化する
export const prefersReducedMotion = () =>
	typeof window !== "undefined" &&
	window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
