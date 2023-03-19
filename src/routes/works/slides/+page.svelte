<script lang="ts">
	import NormalHead from '$lib/components/atom/head/NormalHead.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<NormalHead
	title="スライド"
	slug="/works/programming"
	description="登壇などで使用したスライドの一覧ページです"
/>

<h2 class="text-center text-3xl mt-20 mb-12">スライド</h2>

{#each Object.entries(data.data) as [title, slides]}
	<h2 class="text-2xl text-center mx-4 mt-6">{title}</h2>
	<div class="flex justify-center items-stretch flex-wrap">
		{#each slides as slide}
			<div class="flex justify-center flex-col items-center px-8 py-12 w-full ">
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
				<p class="text-lg mt-8">{slide.description}</p>
			</div>
		{/each}
	</div>
{/each}
