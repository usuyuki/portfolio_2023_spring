<script lang="ts">
	// オープニング退場・ページ遷移(シーンチェンジ)で共通利用する斜め帯。
	// PCはpink/blue/yellowの3枚、モバイルはガタつき防止のため2枚(pink/blue)に減らす(仕様8.2)
	export let mobile = false;
	export let backdrop: HTMLElement | undefined = undefined;
	export let bar1: HTMLElement | undefined = undefined;
	export let bar2: HTMLElement | undefined = undefined;
	export let bar3: HTMLElement | undefined = undefined;
</script>

<div class="wipe-bars" aria-hidden="true">
	<!-- 帯どうしの隙間やskewの継ぎ目から裏のページが透けないよう、帯と全く同じ動きをする黒背景を敷く。
	     単独の固定オーバーレイにすると退場時にこれだけが画面に残ってしまうため、他の帯と同じtranslateXアニメーション対象にする -->
	<div class="backdrop" bind:this={backdrop}></div>
	<div class="bar bar-pink" bind:this={bar1}></div>
	<div class="bar bar-blue" bind:this={bar2}></div>
	{#if !mobile}
		<div class="bar bar-yellow" bind:this={bar3}></div>
	{/if}
</div>

<style>
	.wipe-bars {
		position: fixed;
		inset: 0;
		z-index: 1001;
		pointer-events: none;
		display: flex;
		overflow: hidden;
	}
	.backdrop {
		position: absolute;
		inset: 0;
		background: var(--black);
		transform: translateX(160vw);
	}
	.bar {
		flex: 1;
		transform: translateX(160vw) skewX(-12deg);
	}
	.bar-pink {
		background: var(--pink);
	}
	.bar-blue {
		background: var(--blue);
	}
	.bar-yellow {
		background: var(--yellow);
	}
</style>
