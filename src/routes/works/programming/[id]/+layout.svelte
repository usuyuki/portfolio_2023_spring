<script lang="ts">
	import Autoplay from 'embla-carousel-autoplay';
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import type { PageData } from '../$types';
	export let data: PageData;
</script>

<slot />

<p class="text-center mt-12 mb-4 text-2xl font-serif">他につくったもの！</p>
<aside
	class="overflow-hidden border-2 border-pink border-dotted rounded-xl shadow-xl"
	use:emblaCarouselSvelte={{
		options: {
			loop: false,
			dragFree: true,
			containScroll: 'trimSnaps',
			align: 'center',
			startIndex: 0
		},
		plugins: [Autoplay()]
	}}
>
	<div class="flex">
		{#each Object.entries(data.data) as [id, work]}
			<div class="embla-slide">
				<a class="block" href="/works/programming/{id}">
					<div class="mx-4 my-2">
						<img
							loading="lazy"
							alt="サムネイル"
							src={work.thumbnail}
							class="mx-auto aspect-video w-1/2 object-cover"
						/>
						<div class="flex justify-center items-center">
							<img loading="lazy" src={work.logo} class="w-12 h-12 " alt="logo" />
							<h2 class="text-2xl">{work.name}</h2>
						</div>
						<p class="text-lg text-center">{work.summary}</p>
					</div>
				</a>
				<div class="w-full h-4 bg-blue mt-8" />
				<div class="mx-auto w-12 h-12 bg-yellow rounded-full relative -top-8" />
				<p class="text-center text-xl text-blue relative -top-4">{work.publishedAt}</p>
			</div>
		{/each}
	</div>
</aside>

<style>
	.embla-slide {
		flex: 0 0 50%;
		min-width: 0;
	}
</style>
