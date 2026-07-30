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

<div class="balloon reveal-fade-up relative {className}" class:started>
	<div class="balloon-tip"></div>
	<p class="text-left text-lg">{greeting}</p>
</div>

<style>
	/* フェードイン自体はapp.cssの.reveal-fade-up共通クラスに委譲。
	   +page.svelteの.icon-greeting .iconと同じタイミングでふわっとでてくる */
	.balloon {
		margin-bottom: 0.75rem;
		padding: 0.75rem 1rem;
		max-width: 260px;
		/* greeting(Notion管理・可変長)が1行に収まる場合でも、フェードイン前後で
		   アイコンの位置がガタつかないよう最低1行分の高さを事前に確保しておく */
		min-height: calc(0.75rem * 2 + 1.75em);
		background-color: var(--ui-bg);
		border-radius: 1rem;
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
</style>
