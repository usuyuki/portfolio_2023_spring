<script lang="ts">
	import NormalHead from '$lib/components/atom/head/NormalHead.svelte';
	import HeadingWithBorder from '$lib/components/atom/text/sentence/HeadingWithBorder.svelte';
	import NormalPageTitle from '$lib/components/atom/text/sentence/NormalPageTitle.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<NormalHead title="スライド" description="登壇などで使用したスライドの一覧ページです" />

<NormalPageTitle title="スライド" />

{#each Object.entries(data.data) as [title, slides]}
	<HeadingWithBorder {title} />
	<div class="flex justify-center items-stretch flex-wrap">
		{#each slides as slide}
			<div class="flex justify-center flex-col items-center px-8 py-12 w-full">
				<iframe
					class="aspect-video mx-4 mb-2 w-full md:w-4/5 bg-gray-400 rounded-lg"
					src={slide.slideIframe}
					title="Speaker Deck Iframe"
					frameborder="0"
					allowfullscreen={false}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				/>
				<h2 class="text-2xl">{slide.name}</h2>
				<p class="mt-2">{slide.publishedAt}</p>
				<div class="flex justify-center items-center mt-8 w-5/6 md:w-2/3 mx-auto">
					<p class="text-lg">{slide.description}</p>
				</div>
			</div>
		{/each}
	</div>
{/each}
