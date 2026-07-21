import gsap from "gsap";

const HOVER_SCALE = 1.08;
const PRESS_SCALE = 0.92;
const NORMAL_SCALE = 1;

// タッチ操作はpointerenter/leaveが「ホバー」を意味しないため、マウス系ポインタのみホバー拡大の対象にする
const isHoverCapable = (event: PointerEvent) => event.pointerType === "mouse";

// OS側で「視差効果を減らす」等の設定がされている場合はスケールアニメーションを無効化する
const prefersReducedMotion = () =>
	typeof window !== "undefined" &&
	window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// ホバーで拡大、クリック(pointerdown→pointerup/leave)で縮小→復帰するscaleアニメーションをGSAPのイージングで付与するSvelteアクション
export function pressEasing(node: HTMLElement) {
	// transformの基準点がずれるとscale時に位置が飛ぶため、変形の中心を要素中央に固定する
	node.style.transformOrigin = "center";

	let isHovering = false;

	const animateTo = (scale: number, duration: number) => {
		if (prefersReducedMotion()) {
			gsap.set(node, { scale });
			return;
		}
		gsap.to(node, {
			scale,
			duration,
			ease: "power2.out",
			overwrite: true,
		});
	};

	const handlePointerEnter = (event: PointerEvent) => {
		if (!isHoverCapable(event)) return;
		isHovering = true;
		animateTo(HOVER_SCALE, 0.25);
	};
	const handlePointerDown = (event: PointerEvent) => {
		animateTo(PRESS_SCALE, 0.12);
		// タッチはpointerenterがホバーを意味しないため、pointerdown時点でisHoveringをfalseに揃えておく
		if (!isHoverCapable(event)) isHovering = false;
	};
	const handlePointerUp = () => {
		animateTo(isHovering ? HOVER_SCALE : NORMAL_SCALE, 0.2);
	};
	const handlePointerLeave = (event: PointerEvent) => {
		if (!isHoverCapable(event)) return;
		isHovering = false;
		animateTo(NORMAL_SCALE, 0.25);
	};

	node.addEventListener("pointerenter", handlePointerEnter);
	node.addEventListener("pointerdown", handlePointerDown);
	node.addEventListener("pointerup", handlePointerUp);
	node.addEventListener("pointerleave", handlePointerLeave);
	node.addEventListener("pointercancel", handlePointerLeave);

	return {
		destroy() {
			node.removeEventListener("pointerenter", handlePointerEnter);
			node.removeEventListener("pointerdown", handlePointerDown);
			node.removeEventListener("pointerup", handlePointerUp);
			node.removeEventListener("pointerleave", handlePointerLeave);
			node.removeEventListener("pointercancel", handlePointerLeave);
			// 退出トランジション中に中途半端な拡縮のまま止まらないよう、破棄前に等倍へ即座に戻す
			gsap.killTweensOf(node);
			gsap.set(node, { scale: NORMAL_SCALE });
		},
	};
}
