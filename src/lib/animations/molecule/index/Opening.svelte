<script lang="ts">
	import gsap from "gsap";
	import { onDestroy, onMount } from "svelte";
	import { prefersReducedMotion } from "$lib/utils/motion";
	import {
		OPENING_FINISHED_EVENT,
		OPENING_SESSION_KEY,
	} from "$lib/utils/openingEvent";

	let overlayEl: HTMLElement;
	let logoBoxEl: HTMLElement;
	let loadingEl: HTMLElement;
	let gaugeFillEl: HTMLElement;

	// visible: オーバーレイをDOMに残すかどうか。falseになったらこのコンポーネントごと外れる想定
	let visible = true;
	// destroyed: ページ遷移等でコンポーネントが破棄された後、runGaugeLoopの再帰が復活するのを防ぐ
	let destroyed = false;
	// finish()自体の再入防止(フェードアウト完了までの間はまだ進行中のtweenが残っているため)
	let finishing = false;

	// ページの実読み込み(画像・フォント等を含む)が完了しているか。完了前にゲージが満タンになった場合はゲージを繰り返す
	const isPageLoaded = () =>
		typeof document !== "undefined" && document.readyState === "complete";

	// 退場演出はシーンチェンジ(WipeBars)とは別に、オーバーレイ自体のフェードアウトのみで済ませる
	// delay: ゲージ満タン直後にフェードが始まると唐突なため、一呼吸置いてから抜ける(スキップ時は0で即応させる)
	const finish = (delay = 0.2) => {
		if (finishing) return;
		finishing = true;
		gsap.to(overlayEl, {
			opacity: 0,
			duration: 0.5,
			delay,
			ease: "power1.out",
			onComplete: () => {
				visible = false;
				// AccessCounter/MisskeyRecentNotes/SNSMenu等、オープニング後に登場する演出へ完了を通知する
				document.dispatchEvent(new CustomEvent(OPENING_FINISHED_EVENT));
			},
		});
	};

	// ページ読み込みが終わらない場合でもオープニングが無限に固まらないよう、ゲージの周回数に上限を設ける
	const MAX_GAUGE_LOOPS = 5;

	// NOW LOADINGゲージを1周(scaleX 0→1、1.0s)させる。満タンになった時点で判定し、
	// まだページ読み込みが終わっていなければゲージを0へ戻してもう一周させる(仕様への追加要望: ローディングが終わるまで繰り返す)。
	// 逆に読み込みが先に終わっていても、再生中の1周は最後まで走らせてから次へ進む(演出が唐突に途切れるのを防ぐ)
	const runGaugeLoop = (onceComplete: () => void, loopCount = 0) => {
		gsap.fromTo(
			gaugeFillEl,
			{ scaleX: 0 },
			{
				scaleX: 1,
				duration: 1.0,
				ease: "power1.inOut",
				onComplete: () => {
					// onDestroy側でkillTweensOfされた後にこのコールバックが呼ばれ、ループが復活するのを防ぐ
					if (destroyed) return;
					// MAX_GAUGE_LOOPS周してもページ読み込みが終わらない場合は、待ち続けず強制的に次へ進む
					if (isPageLoaded() || loopCount + 1 >= MAX_GAUGE_LOOPS) {
						onceComplete();
						return;
					}
					gsap.set(gaugeFillEl, { scaleX: 0 });
					runGaugeLoop(onceComplete, loopCount + 1);
				},
			},
		);
	};

	const playOpening = () => {
		if (prefersReducedMotion()) {
			// スケール/波紋演出を省略し、フェードのみで即座に表示する
			gsap.set(logoBoxEl, { scale: 1, opacity: 1 });
			gsap.set(loadingEl, { opacity: 1 });
			gsap.set(gaugeFillEl, { scaleX: 1 });
			finish(0);
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
				// onDestroy側でkillTweensOfされた後にこのコールバックが呼ばれ、破棄済みコンポーネントで新規tweenが走るのを防ぐ
				if (destroyed) return;
				gsap.to(loadingEl, {
					opacity: 1,
					duration: 0.3,
					onComplete: () => {
						if (destroyed) return;
						runGaugeLoop(finish);
					},
				});
			},
		});
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

	// ページ遷移等でコンポーネントが破棄される際、再帰的なrunGaugeLoopや進行中のtweenを止める
	onDestroy(() => {
		destroyed = true;
		if (typeof window === "undefined") return;
		gsap.killTweensOf([logoBoxEl, loadingEl, gaugeFillEl, overlayEl]);
	});
</script>

{#if visible}
	<div bind:this={overlayEl} class="opening">
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
	</div>
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
</style>
