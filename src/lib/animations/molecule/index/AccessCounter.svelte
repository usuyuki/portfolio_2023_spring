<script lang="ts">
	import Burst from '$lib/animations/atom/Burst.svelte';
	import { fly } from 'svelte/transition';
	export let count: string;
	let visible = false;
	const countInt = parseInt(count);

	$: nowValue = 0;
	//アニメーションが終わるのを待ってから表示
	setTimeout(() => {
		visible = true;
		//2秒掛けてnowValueの値をcountの値にする
		for (let i = 0; i <= countInt; i++) {
			setTimeout(() => {
				nowValue = i;
			}, (2000 / countInt) * i);
		}
	}, 2700);
</script>

<div class="flex relative flex-col justify-center items-center mx-auto mt-2 mb-4 text-2xl md:w-1/2">
	{#if visible}
		<p class="w-full text-left" in:fly|global={{ y: 50, duration: 500, delay: 0 }}>あなたは</p>
		<div class="relative">
			<p class="w-full text-3xl text-center" in:fly|global={{ y: 50, duration: 500, delay: 500 }}>
				{nowValue}
			</p>
			<div class="burst-add">
				<Burst color="pink" animationDelay="2.5s" animationDuration="0.5s" />
			</div>
		</div>
		<p class="w-full text-right" in:fly|global={{ y: 50, duration: 300, delay: 2100 }}>
			番目の訪問者です！
		</p>
	{:else}
		<!-- 3行分事前に確保(揺れを防ぐ) -->
		<div class="h-16" />
	{/if}
</div>

<style>
	.burst-add {
		position: absolute;
		top: -32%;
		left: 13%;
	}
</style>
