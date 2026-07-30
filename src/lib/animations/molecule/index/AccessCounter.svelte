<script lang="ts">
	import { onDestroy } from "svelte";
	import { fly } from "svelte/transition";
	import Burst from "$lib/animations/atom/Burst.svelte";
	import { onOpeningFinished } from "$lib/utils/openingEvent";
	export let count: string;
	let visible = false;
	const countInt = parseInt(count, 10);

	$: nowValue = 0;
	// SNSアイコンの登場演出(app.cssの--after-sns-time相当)がオープニング完了から700ms後に終わるため、
	// カウンターはそのぶん遅らせて表示する
	const SHOW_DELAY_MS = 700;
	// setTimeoutのIDを保持し、コンポーネント破棄時にまとめてクリアする
	let showTimeoutId: ReturnType<typeof setTimeout>;
	const countUpTimeoutIds: ReturnType<typeof setTimeout>[] = [];

	// オープニング演出が完了(またはスキップ/再訪問で不要)になったのを待ってから表示する
	const unsubscribe = onOpeningFinished(() => {
		showTimeoutId = setTimeout(() => {
			visible = true;
			//2秒掛けてnowValueの値をcountの値にする
			for (let i = 0; i <= countInt; i++) {
				countUpTimeoutIds.push(
					setTimeout(
						() => {
							nowValue = i;
						},
						(2000 / countInt) * i,
					),
				);
			}
		}, SHOW_DELAY_MS);
	});
	onDestroy(() => {
		unsubscribe();
		clearTimeout(showTimeoutId);
		for (const id of countUpTimeoutIds) {
			clearTimeout(id);
		}
	});
</script>

<div
	class="flex relative flex-col justify-center items-center mx-auto mt-2 mb-4 text-2xl md:w-1/2"
>
	{#if visible}
		<p
			class="w-full text-left"
			in:fly|global={{ y: 50, duration: 500, delay: 0 }}
		>
			あなたは
		</p>
		<div class="relative">
			<p
				class="w-full text-3xl text-center"
				in:fly|global={{ y: 50, duration: 500, delay: 500 }}
			>
				{nowValue}
			</p>
			<div class="burst-add">
				<Burst color="pink" animationDelay="2.5s" animationDuration="0.5s" />
			</div>
		</div>
		<p
			class="w-full text-right"
			in:fly|global={{ y: 50, duration: 300, delay: 2100 }}
		>
			番目の訪問者です！
		</p>
	{:else}
		<!-- 3行分事前に確保(揺れを防ぐ) -->
		<div class="h-16"></div>
	{/if}
</div>

<style>
	.burst-add {
		position: absolute;
		top: -32%;
		left: 13%;
	}
</style>
