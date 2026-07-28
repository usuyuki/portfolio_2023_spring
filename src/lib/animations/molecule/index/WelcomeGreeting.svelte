<script lang="ts">
	import { onDestroy } from "svelte";
	import { onOpeningFinished } from "$lib/utils/openingEvent";

	export let greeting: string;
	export const className = "";

	// オープニング完了前はscaleAnimationを止めておき、完了後にクラス付与でアニメーションを開始する
	// (以前はCSSのanimation-delayにapp.cssの--after-access-counter-timeを直接埋め込んでおり、実際の完了とズレていた)
	let started = false;
	const unsubscribe = onOpeningFinished(() => {
		started = true;
	});
	onDestroy(unsubscribe);
</script>

<div class="balloon relative {className}" class:started>
	<div class="balloon-tip"></div>
	<p class="text-left text-lg">{greeting}</p>
</div>

<style>
	/* アイコンのフェードイン(+page.svelteの.icon-greeting .icon)と同じタイミングでふわっとでてくる。
	   .startedが付くまではplay-state:pausedで0%の状態のまま止めておく */
	.balloon {
		animation: fadeUp 0.5s;
		animation-play-state: paused;
		animation-fill-mode: forwards;
		opacity: 0;
		margin-bottom: 0.75rem;
		padding: 0.75rem 1rem;
		max-width: 260px;
		background-color: var(--ui-bg);
		border-radius: 1rem;
	}

	.balloon.started {
		animation-play-state: running;
	}

	.balloon-tip {
		position: absolute;
		left: 50%;
		bottom: -0.5rem;
		transform: translateX(-50%);
		width: 0;
		height: 0;
		border-left: 0.5rem solid transparent;
		border-right: 0.5rem solid transparent;
		border-top: 0.5rem solid var(--ui-bg);
	}

	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(50px);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
