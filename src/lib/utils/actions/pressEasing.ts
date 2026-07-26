import gsap from "gsap";

const HOVER_SCALE = 1.06;
const PRESS_SCALE = 0.86;
const NORMAL_SCALE = 1;

// タッチ操作はpointerenter/leaveが「ホバー」を意味しないため、マウス系ポインタのみホバー拡大の対象にする
const isHoverCapable = (event: PointerEvent) => event.pointerType === "mouse";

// OS側で「視差効果を減らす」等の設定がされている場合はスケール/演出アニメーションを無効化する
const prefersReducedMotion = () =>
	typeof window !== "undefined" &&
	window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// 同一要素で連打された際にスラッシュが多重生成されるのを防ぐためのin-flight管理
const activeSlashes = new WeakSet<HTMLElement>();

// 押した瞬間、要素内を左から右へ斜めに駆け抜ける白い光の帯を1つ生成し、アニメーション終了後にDOMから除去する
const spawnSlash = (node: HTMLElement) => {
	if (prefersReducedMotion()) return;
	if (activeSlashes.has(node)) return;
	activeSlashes.add(node);

	const slash = document.createElement("span");
	Object.assign(slash.style, {
		position: "absolute",
		inset: "0",
		pointerEvents: "none",
		zIndex: "5",
		background:
			"linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.95) 48%, rgba(255,255,255,0.95) 54%, transparent 72%)",
		mixBlendMode: "overlay",
		transform: "translateX(-140%) skewX(-18deg)",
	} satisfies Partial<CSSStyleDeclaration>);

	// リップルならぬスラッシュを要素内に閉じ込めるための配置コンテキストを用意する。
	// 押下前の値を記録しておき、アニメーション終了後に自分が変更した分だけ元へ戻す
	// (box-shadowのオフセットをoverflow:hiddenが恒久的にクリップしてしまうのを防ぐため)
	const computed = getComputedStyle(node);
	const hadStaticPosition = computed.position === "static";
	const hadVisibleOverflow = computed.overflow === "visible";
	if (hadStaticPosition) node.style.position = "relative";
	if (hadVisibleOverflow) node.style.overflow = "hidden";

	node.appendChild(slash);
	gsap.fromTo(
		slash,
		{ x: "-140%", opacity: 1 },
		{
			x: "140%",
			opacity: 0,
			duration: 0.32,
			ease: "power3.out",
			onComplete: () => {
				slash.remove();
				if (hadStaticPosition) node.style.position = "";
				if (hadVisibleOverflow) node.style.overflow = "";
				activeSlashes.delete(node);
			},
		},
	);
};

// ホバーで拡大、クリック(pointerdown→pointerup/leave)で「ペルソナ風スナップ」の縮小+傾き+スラッシュ光→弾む復帰を行う
// GSAPのイージングで駆動するSvelteアクション。既存の pressEasing と同名・同シグネチャなので差し替えのみでOK。
export function pressEasing(node: HTMLElement) {
	// transformの基準点がずれるとscale/rotate時に位置が飛ぶため、変形の中心を要素中央に固定する
	node.style.transformOrigin = "center";

	let isHovering = false;

	const toHover = () => {
		if (prefersReducedMotion()) {
			gsap.set(node, { scale: HOVER_SCALE, rotate: 0 });
			return;
		}
		gsap.to(node, {
			scale: HOVER_SCALE,
			rotate: 0,
			duration: 0.2,
			ease: "power2.out",
			overwrite: "auto",
		});
	};
	const toNormal = () => {
		if (prefersReducedMotion()) {
			gsap.set(node, { scale: NORMAL_SCALE, rotate: 0 });
			return;
		}
		gsap.to(node, {
			scale: NORMAL_SCALE,
			rotate: 0,
			duration: 0.5,
			ease: "back.out(3.5)",
			overwrite: "auto",
		});
	};
	// ランダムな傾き(-3degか+3deg)を付与しつつ鋭く縮小する
	const toPress = () => {
		const tilt = Math.random() < 0.5 ? -3 : 3;
		if (prefersReducedMotion()) {
			gsap.set(node, { scale: PRESS_SCALE, rotate: tilt });
			return;
		}
		gsap.to(node, {
			scale: PRESS_SCALE,
			rotate: tilt,
			duration: 0.07,
			ease: "power4.out",
			overwrite: "auto",
		});
	};

	const handlePointerEnter = (event: PointerEvent) => {
		if (!isHoverCapable(event)) return;
		isHovering = true;
		toHover();
	};
	const handlePointerDown = (event: PointerEvent) => {
		toPress();
		spawnSlash(node);
		// .box / .btn-rpg 相当の要素は、このクラスの付与でオフセット影を一瞬潰す(app.cssの.is-pressed参照)
		node.classList.add("is-pressed");
		// タッチはpointerenterがホバーを意味しないため、pointerdown時点でisHoveringをfalseに揃えておく
		if (!isHoverCapable(event)) isHovering = false;
	};
	const handlePointerUp = (event: PointerEvent) => {
		isHoverCapable(event) && isHovering ? toHover() : toNormal();
		node.classList.remove("is-pressed");
	};
	const handlePointerLeave = (event: PointerEvent) => {
		node.classList.remove("is-pressed");
		if (!isHoverCapable(event)) return;
		isHovering = false;
		toNormal();
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
			// 退出トランジション中に中途半端な拡縮・傾きのまま止まらないよう、破棄前に等倍/水平へ即座に戻す
			gsap.killTweensOf(node);
			gsap.set(node, { scale: NORMAL_SCALE, rotate: 0 });
			node.classList.remove("is-pressed");
			activeSlashes.delete(node);
		},
	};
}
