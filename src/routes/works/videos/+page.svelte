<script lang="ts">
	import NormalHead from '$lib/components/atom/head/NormalHead.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<NormalHead title="映像作品" slug="/works/programming" description="映像作品のページです" />

<h2 class="text-center text-xl mt-20 mb-12">映像作品</h2>

<div class="flex justify-center items-stretch flex-wrap">
	{#each data.data as videos}
		<div class="flex justify-center flex-col items-center px-8 py-12 w-full md:w-1/2">
			<p class="mt-2">{videos.publishedAt}</p>
			<iframe
				class="aspect-video mx-4 mb-2 w-full md:w-4/5 bg-gray-400 rounded-lg"
				src={videos.youtubeIframe}
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			/>
			<h2 class="text-2xl">{videos.name}</h2>
			<p class="text-lg mt-4">{videos.description}</p>
		</div>
	{/each}
</div>
