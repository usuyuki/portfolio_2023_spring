<script lang="ts">
	import NormalHead from '$lib/components/atom/head/NormalHead.svelte';
	import NormalPageTitle from '$lib/components/atom/text/sentence/NormalPageTitle.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<NormalHead title="技術スタック" description="シェフのきまぐれ技術スタック" />
<NormalPageTitle title="技術スタック" />

{#each Object.entries(data.data) as [genreTitle, techStacks]}
	<h2 class="text-3xl text-center mx-4 mt-12 mb-4">「{genreTitle}」</h2>
	<div class="flex justify-center items-center flex-wrap mb-20">
		{#each techStacks as techStack}
			<div class="w-full md:w-1/2 flex flex-wrap justify-center items-center">
				<div
					class="techStackPercent m-4 flex justify-center items-center w-60 h-60 rounded-full"
					style="--power:{techStack.power}"
				>
					<h2 class="text-2xl techStackName">{techStack.name}</h2>
				</div>
				<div class="flex flex-col jusify-center items-center px-4 py-2 w-full md:w-1/2">
					<p class="">{techStack.content}</p>
				</div>
			</div>
		{/each}
	</div>
{/each}

<style>
	/* 結果となる%変数 */
	/* @propertyはwebkit系が全滅なので使わないこと！ */
	/* @propertyが使えると0と100の指定だけでいい感じになめらかにできるので、safariが対応したら使いたい  */
	@keyframes circleAnim {
		0% {
			--percent: 0;
		}
		10% {
			--percent: calc(var(--power) / 10);
		}
		20% {
			--percent: calc(var(--power) / 5);
		}
		30% {
			--percent: calc(var(--power) / 4);
		}
		40% {
			--percent: calc(var(--power) / 3);
		}
		50% {
			--percent: calc(var(--power) / 2);
		}
		60% {
			--percent: calc(var(--power) / 1.5);
		}
		70% {
			--percent: calc(var(--power) / 1.2);
		}
		80% {
			--percent: calc(var(--power) / 1.1);
		}
		90% {
			--percent: calc(var(--power) / 1.05);
		}
		100% {
			--percent: var(--power);
		}
	}
	.techStackPercent {
		--power: 0;
		--percent: 0;
		animation: circleAnim 1s forwards;
		background-image: conic-gradient(
			var(--blue) 0%,
			var(--blue) calc(var(--percent) * 1%),
			gray calc(var(--percent) * 1.01%) 100%
		);
	}
</style>
