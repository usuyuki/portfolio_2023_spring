<script lang="ts">
	import gsap from "gsap";
	import { onMount } from "svelte";
	import WipeBars from "$lib/animations/atom/WipeBars.svelte";
	import { coverWithBars, revealFromBars } from "$lib/utils/actions/wipeBars";
	import { prefersReducedMotion } from "$lib/utils/motion";
	import {
		OPENING_FINISHED_EVENT,
		OPENING_SESSION_KEY,
	} from "$lib/utils/openingEvent";

	let overlayEl: HTMLElement;
	let logoBoxEl: HTMLElement;
	let loadingEl: HTMLElement;
	let gaugeFillEl: HTMLElement;
	let flashEl: HTMLElement;
	let backdrop: HTMLElement | undefined;
	let bar1: HTMLElement | undefined;
	let bar2: HTMLElement | undefined;
	let bar3: HTMLElement | undefined;

	// visible: オーバーレイをDOMに残すかどうか。falseになったらこのコンポーネントごと外れる想定
	let visible = true;
	let skipped = false;

	const bars = () =>
		[backdrop, bar1, bar2, bar3].filter((el): el is HTMLElement => !!el);

	// ページの実読み込み(画像・フォント等を含む)が完了しているか。完了前にゲージが満タンになった場合はゲージを繰り返す
	const isPageLoaded = () =>
		typeof document !== "undefined" && document.readyState === "complete";

	const finish = () => {
		coverWithBars(bars(), () => {
			visible = false;
			revealFromBars(bars());
			// AccessCounter/MisskeyRecentNotes/SNSMenu等、オープニング後に登場する演出へ完了を通知する
			document.dispatchEvent(new CustomEvent(OPENING_FINISHED_EVENT));
		});
	};

	// NOW LOADINGゲージを1周(scaleX 0→1、1.0s)させる。満タンになった時点で判定し、
	// まだページ読み込みが終わっていなければゲージを0へ戻してもう一周させる(仕様への追加要望: ローディングが終わるまで繰り返す)。
	// 逆に読み込みが先に終わっていても、再生中の1周は最後まで走らせてから次へ進む(演出が唐突に途切れるのを防ぐ)
	const runGaugeLoop = (onceComplete: () => void) => {
		gsap.fromTo(
			gaugeFillEl,
			{ scaleX: 0 },
			{
				scaleX: 1,
				duration: 1.0,
				ease: "power1.inOut",
				onComplete: () => {
					// skipOpening側でkillTweensOfされた後にこのコールバックが呼ばれ、ループが復活するのを防ぐ
					if (skipped) return;
					if (isPageLoaded()) {
						onceComplete();
						return;
					}
					gsap.set(gaugeFillEl, { scaleX: 0 });
					runGaugeLoop(onceComplete);
				},
			},
		);
	};

	const playFlashAndFinish = () => {
		gsap
			.timeline()
			.to(flashEl, { opacity: 0.3, duration: 0.08 })
			.to(flashEl, { opacity: 0, duration: 0.2, onComplete: finish });
	};

	const playOpening = () => {
		if (prefersReducedMotion()) {
			// スケール/波紋演出を省略し、フェードのみで即座に表示する
			gsap.set(logoBoxEl, { scale: 1, opacity: 1 });
			gsap.set(loadingEl, { opacity: 1 });
			gsap.set(gaugeFillEl, { scaleX: 1 });
			finish();
			return;
		}
		// 複数要素にまたがるgsap.timeline()の絶対位置指定は環境によってcall()コールバックの発火が安定しないため、
		// 要素ごとのtween → onCompleteでの逐次実行に分けて確実性を優先する
		gsap.to(logoBoxEl, {
			scale: 1,
			opacity: 1,
			duration: 0.5,
			ease: "back.out(2.5)",
			delay: 0.1,
			onComplete: () => {
				gsap.to(loadingEl, {
					opacity: 1,
					duration: 0.3,
					onComplete: () => {
						runGaugeLoop(playFlashAndFinish);
					},
				});
			},
		});
	};

	const skipOpening = () => {
		if (skipped) return;
		skipped = true;
		gsap.killTweensOf([logoBoxEl, loadingEl, gaugeFillEl, flashEl]);
		finish();
	};

	onMount(() => {
		if (typeof window === "undefined") return;
		if (window.sessionStorage.getItem(OPENING_SESSION_KEY)) {
			visible = false;
			return;
		}
		window.sessionStorage.setItem(OPENING_SESSION_KEY, "1");
		playOpening();
	});
</script>

{#if visible}
	<div
		bind:this={overlayEl}
		class="opening"
		role="button"
		tabindex="0"
		aria-label="オープニング演出をスキップ"
		on:click={skipOpening}
		on:keydown={(e) => (e.key === "Enter" || e.key === " ") && skipOpening()}
	>
		<div bind:this={logoBoxEl} class="box logo-box">
			<h1 class="serif">
				<span>う</span><span>す</span><span>ゆ</span><span>き</span><span>ど</span><span
					>っ</span
				><span>と</span><span>ね</span><span>っ</span><span>と</span>
			</h1>
		</div>
		<div bind:this={loadingEl} class="loading">
			<span class="label tag">NOW LOADING</span>
			<div class="gauge">
				<div bind:this={gaugeFillEl} class="gauge-fill"></div>
			</div>
		</div>
		<span class="skip tag">CLICK / TAP TO SKIP</span>
		<div bind:this={flashEl} class="flash"></div>
	</div>
	<WipeBars bind:backdrop bind:bar1 bind:bar2 bind:bar3 />
{/if}

<style>
	.opening {
		position: fixed;
		inset: 0;
		z-index: 1000;
		background: var(--black);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 26px;
		cursor: pointer;
	}
	.serif {
		font-family: var(--heading-font);
	}
	.tag {
		font-family: var(--tag-font);
	}
	.logo-box {
		padding: 26px 44px;
		box-shadow: 8px 8px 0 var(--pink);
		transform: scale(0.4);
		opacity: 0;
	}
	.logo-box h1 {
		font-size: clamp(28px, 6vw, 56px);
		margin: 0;
		letter-spacing: 2px;
		line-height: 1.2;
		text-align: center;
	}
	.loading {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		opacity: 0;
	}
	.loading .label {
		color: var(--white);
		font-size: 12px;
		letter-spacing: 3px;
	}
	.gauge {
		width: 260px;
		height: 18px;
		background: var(--ui-bg);
		border: 3px solid var(--white);
		border-radius: 999px;
		overflow: hidden;
	}
	.gauge-fill {
		height: 100%;
		background: var(--pink);
		width: 100%;
		border-radius: 999px;
		transform-origin: left;
		transform: scaleX(0);
	}
	.skip {
		color: var(--white);
		font-size: 10px;
		opacity: 0.5;
		margin-top: 10px;
	}
	.flash {
		position: absolute;
		inset: 0;
		background: #fff;
		opacity: 0;
		pointer-events: none;
	}
</style>
