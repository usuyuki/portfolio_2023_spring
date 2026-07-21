import gsap from "gsap";

const HOVER_SCALE = 1.08;
const PRESS_SCALE = 0.92;
const NORMAL_SCALE = 1;

// ホバーで拡大、クリック(pointerdown→pointerup/leave)で縮小→復帰するscaleアニメーションをGSAPのイージングで付与するSvelteアクション
export function pressEasing(node: HTMLElement) {
	// transformの基準点がずれるとscale時に位置が飛ぶため、変形の中心を要素中央に固定する
	node.style.transformOrigin = "center";

	let isHovering = false;

	const animateTo = (scale: number, duration: number) => {
		gsap.to(node, {
			scale,
			duration,
			ease: "power2.out",
			overwrite: true,
		});
	};

	const handlePointerEnter = () => {
		isHovering = true;
		animateTo(HOVER_SCALE, 0.25);
	};
	const handlePointerDown = () => {
		animateTo(PRESS_SCALE, 0.12);
	};
	const handlePointerUp = () => {
		animateTo(isHovering ? HOVER_SCALE : NORMAL_SCALE, 0.2);
	};
	const handlePointerLeave = () => {
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
			gsap.killTweensOf(node);
		},
	};
}
