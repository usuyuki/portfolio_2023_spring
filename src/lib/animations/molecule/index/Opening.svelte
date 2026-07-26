<script lang="ts">
	import { onMount } from "svelte";
	import gsap from "gsap";

	let wrapperEl: HTMLDivElement;
	let rhombusEl: HTMLDivElement;
	let ripplesEl: HTMLDivElement;
	let ripplesDottedEl: HTMLDivElement;
	let spanEls: HTMLSpanElement[] = [];

	// 各文字ごとの開始位置(%指定)。元のCSS keyframesの0%/50%地点をそのまま経由点として使う
	const spanKeyframes: { from: [number, number]; via: [number, number] }[] = [
		{ from: [70, 40], via: [10, 30] },
		{ from: [30, 40], via: [20, 30] },
		{ from: [40, 20], via: [30, 40] },
		{ from: [50, 50], via: [40, 20] },
		{ from: [60, 30], via: [50, 50] },
		{ from: [70, 60], via: [60, 30] },
		{ from: [80, 10], via: [70, 60] },
		{ from: [90, 70], via: [80, 10] },
		{ from: [100, 40], via: [90, 70] },
		{ from: [110, 80], via: [100, 40] },
	];

	// OS側で「視差効果を減らす」設定がされている場合はアニメーションを省略し、最終状態へ即座に遷移する
	const prefersReducedMotion = () =>
		typeof window !== "undefined" &&
		window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

	onMount(() => {
		if (prefersReducedMotion()) {
			gsap.set(spanEls, { x: 0, y: 0 });
			gsap.set(wrapperEl, { height: 0, autoAlpha: 0 });
			return;
		}

		const tl = gsap.timeline();

		// 文字を1つずつカクカクと動かして整列させる
		spanEls.forEach((span, i) => {
			const { from, via } = spanKeyframes[i];
			gsap.set(span, { xPercent: from[0], yPercent: from[1] });
			tl.to(
				span,
				{
					xPercent: via[0],
					yPercent: via[1],
					duration: 0.5,
					ease: "steps(1)",
				},
				0,
			).to(
				span,
				{
					xPercent: 0,
					yPercent: 0,
					duration: 0.5,
					ease: "steps(1)",
				},
				0.5,
			);
		});

		// 広がる波紋(実線)
		tl.fromTo(
			ripplesEl,
			{ scale: 0, opacity: 1 },
			{ scale: 30, opacity: 1, duration: 2 * 0.99, ease: "none" },
			1.1,
		).to(ripplesEl, { scale: 0, opacity: 0, duration: 2 * 0.01, ease: "none" });

		// 広がる波紋(点線)
		tl.fromTo(
			ripplesDottedEl,
			{ scale: 30, opacity: 1 },
			{ scale: 0, opacity: 0, duration: 1, ease: "none" },
			2,
		);

		// ラッパー自体をフェードアウトさせて畳む
		tl.to(
			wrapperEl,
			{ opacity: 0, height: "100%", duration: 0.5 * 0.99, ease: "none" },
			1.5,
		).to(wrapperEl, {
			height: 0,
			autoAlpha: 0,
			duration: 0.5 * 0.01,
			ease: "none",
		});

		return () => {
			tl.kill();
		};
	});
</script>

<div class="animation-wrapper" bind:this={wrapperEl}>
	<p>
		<!-- うすゆきどっとねっと -->
		<span bind:this={spanEls[0]}>う</span>
		<span bind:this={spanEls[1]}>す</span>
		<span bind:this={spanEls[2]}>ゆ</span>
		<span bind:this={spanEls[3]}>き</span>
		<span bind:this={spanEls[4]}>ど</span>
		<span bind:this={spanEls[5]}>っ</span>
		<span bind:this={spanEls[6]}>と</span>
		<span bind:this={spanEls[7]}>ね</span>
		<span bind:this={spanEls[8]}>っ</span>
		<span bind:this={spanEls[9]}>と</span>
	</p>
	<div class="rhombus" bind:this={rhombusEl}></div>
	<div class="ripples" bind:this={ripplesEl}></div>
	<div class="ripples-dotted" bind:this={ripplesDottedEl}></div>
</div>

<style>
	/* 広がる波紋 */
	.ripples {
		width: 5%;
		aspect-ratio: 1/1;
		border-radius: 50%;
		position: absolute;
		top: 40%;
		left: 50%;
		z-index: 3;
		opacity: 0;
		background-color: var(--white);
		border: 1px solid var(--blue);
	}

	.ripples-dotted {
		width: 5%;
		aspect-ratio: 1/1;
		border-radius: 50%;
		position: absolute;
		top: 40%;
		left: 50%;
		z-index: 3;
		opacity: 0;
		border: 1px dotted var(--yellow);
	}
	/* 文字を取り巻く図形 */

	/* ひし形 */
	.rhombus {
		position: absolute;
		top: 40%;
		left: 50%;
		width: 40px;
		height: 40px;
		background: var(--pink);
		transform: skew(30deg, 30deg);
	}
	/** 文字関連 */
	p {
		/* font読み込みで崩れるので、ユーザーの端末で持つフォントを指定する */
		font-family:
			'MS UI Gothic', 'Hiragino Kaku Gothic ProN', 'ヒラギノ角ゴ ProN W3', sans-serif;
		color: var(--white);
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		text-shadow: 0 2px 5px rgba(46, 46, 196, 0.8);
	}
	p > span {
		font-size: 3rem;
		margin: 0.2em 0.3rem;
		display: inline-block;
	}
	/* スマホ向けはサイズ落とす */
	@media screen and (max-width: 768px) {
		p > span {
			font-size: 1.5rem;
		}
	}

	/* ラッパー自体のAnimation */
	.animation-wrapper {
		z-index: 1000;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 0;
		left: 0;
		background-color: var(--black);
		/* 100%だと、スクロールバーの幅分が引かれてしまうので、calcで調整 */
		width: calc(100% - calc(100% - 100%));
		height: 100vh;
	}
</style>
