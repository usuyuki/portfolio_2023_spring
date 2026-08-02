<script lang="ts">
	import gsap from "gsap";
	import { onDestroy, tick } from "svelte";
	import { navigating } from "$app/stores";
	import WipeBars from "$lib/animations/atom/WipeBars.svelte";
	import PageTransition from "$lib/components/atom/loading/PageTransition.svelte";
	import { coverWithBars, revealFromBars } from "$lib/utils/actions/wipeBars";

	// 帯が画面を覆いきるまでの最小表示時間(仕様8.2: 遷移が速すぎて視覚的にジャンプするのを防ぐ)
	const MIN_COVER_MS = 400;

	let backdrop: HTMLElement | undefined;
	let bar1: HTMLElement | undefined;
	let bar2: HTMLElement | undefined;
	let bar3: HTMLElement | undefined;
	// showBars: 帯(+裏の黒背景)をDOMに残すかどうか。trueの間は<slot/>側で新ページに切り替わっても見えない
	let showBars = false;
	let showBuildHint = false;

	// coverWithBars完了 かつ 最小表示時間経過 の両方が揃うまで抜けさせないためのフラグ
	let coveredAt = 0;
	let isCovering = false;
	let pendingReveal = false;
	// 帯が画面を完全に覆いきるまでは<slot/>(新ページ本体)の描画自体を隠す。
	// 読み込みが速いと、帯がまだ移動中で覆いきっていない領域から新ページが透けて見えてしまうため
	let hideContent = false;
	// startReveal内のsetTimeoutのID。次のstartCover()開始時にクリアしないと、
	// 前サイクルの遅延リビールが新サイクルの途中で誤発火し、進行中のカバーアニメーションを打ち消してしまう
	let revealTimeoutId: ReturnType<typeof setTimeout> | undefined;

	// 黒背景も帯と全く同じタイミングで動かすことで、退場時に黒背景だけが画面に取り残されるのを防ぐ
	const bars = () =>
		[backdrop, bar1, bar2, bar3].filter((el): el is HTMLElement => !!el);

	const startCover = async () => {
		// 前サイクルで予約されたままの遅延リビールが新サイクルの途中で発火しないようキャンセルする
		if (revealTimeoutId !== undefined) {
			clearTimeout(revealTimeoutId);
			revealTimeoutId = undefined;
		}
		// 前サイクルのpendingRevealが残っていると、今回のcoverWithBars完了時に
		// 無関係な古い遷移分のstartReveal()が誤発火してしまうためリセットする
		pendingReveal = false;
		showBars = true;
		isCovering = true;
		hideContent = true;
		showBuildHint = false;

		// {#if showBars}で追加されるWipeBarsのbind:thisはDOM更新後でないと解決されないため、
		// tick()を待ってからbars()を参照しないと空配列に対してアニメーションを呼ぶことになる
		await tick();

		coverWithBars(bars(), () => {
			isCovering = false;
			coveredAt = Date.now();
			// 帯が画面を完全に覆いきった後は、帯自体が新ページを隠してくれるため
			// <slot/>の描画を止めておく必要がなくなる
			hideContent = false;
			// 帯が画面中央を覆いきった瞬間に初めてビルド待ち文言を出す
			showBuildHint = true;
			if (pendingReveal) startReveal();
		});
	};

	const startReveal = () => {
		if (isCovering) {
			// 覆いきる前に次ページの準備が終わった場合でも、視覚的なジャンプを防ぐため最小表示時間まで待つ
			pendingReveal = true;
			return;
		}
		pendingReveal = false;

		const elapsed = Date.now() - coveredAt;
		const wait = Math.max(0, MIN_COVER_MS - elapsed);
		revealTimeoutId = setTimeout(() => {
			revealTimeoutId = undefined;
			// ビルド待ち文言は、帯が実際に動き出す(退場を開始する)瞬間まで表示し続ける
			showBuildHint = false;
			revealFromBars(bars(), () => {
				// 帯(+黒背景)が抜けきった後、初めて裏の新ページ(<slot/>の中身)を見せる
				showBars = false;
			});
		}, wait);
	};

	onDestroy(() => {
		gsap.killTweensOf(bars());
		if (revealTimeoutId !== undefined) clearTimeout(revealTimeoutId);
	});

	// $navigatingはnull⇄オブジェクトで遷移の開始/終了を表す。前回値との比較で1回だけ反応させる
	let wasNavigating = false;
	$: {
		const isNavigating = !!$navigating;
		if (isNavigating && !wasNavigating) {
			startCover();
		} else if (!isNavigating && wasNavigating) {
			startReveal();
		}
		wasNavigating = isNavigating;
	}
</script>

<div class="contents" class:invisible={hideContent} aria-hidden={hideContent}>
	<slot />
</div>
{#if showBars}
	<WipeBars bind:backdrop bind:bar1 bind:bar2 bind:bar3 />
{/if}
{#if showBuildHint}
	<PageTransition />
{/if}
