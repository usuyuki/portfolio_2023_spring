<script lang="ts">
	import NormalHead from '$lib/components/atom/head/NormalHead.svelte';
	import NormalPageTitle from '$lib/components/atom/text/sentence/NormalPageTitle.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<NormalHead title="技術スタック" slug="/techStack" description="シェフのきまぐれ技術スタック" />
<NormalPageTitle title="技術スタック" />

{#each Object.entries(data.data) as [genreTitle, techStacks]}
	<h2 class="text-3xl text-center mx-4 mt-12 mb-4 ">「{genreTitle}」</h2>
	<div class="flex justify-center items-center flex-wrap mb-20">
		{#each techStacks as techStack}
			<div class="w-full md:w-1/2 flex items-center">
				<div
					class="techStackPercent m-4 flex justify-center items-center w-60 h-60 rounded-full"
					style="--power:{techStack.power}%"
				>
					<h2 class="text-2xl techStackName">{techStack.name}</h2>
				</div>
				<div class="flex flex-col jusify-center items-center px-4 py-2 w-1/2">
					<p class="">{techStack.content}</p>
				</div>
			</div>
		{/each}
	</div>
{/each}

<style>
	/* 結果となる%変数 */
	@property --power {
		syntax: '<percentage>';
		inherits: false;
		initial-value: 0%;
	}
	/* アニメーション用で動的に変わる%変数 */
	@property --percent {
		syntax: '<percentage>';
		inherits: false;
		initial-value: 0%;
	}
	@keyframes circleAnim {
		0% {
			--percent: 0%;
		}
		99.9%,
		to {
			--percent: var(--power);
		}
	}
	.techStackPercent {
		animation: circleAnim 1s forwards;
		background-image: conic-gradient(
			var(--blue) 0%,
			var(--blue) var(--percent),
			gray calc(var(--percent) * 1.01) 100%
		);
	}
</style>
