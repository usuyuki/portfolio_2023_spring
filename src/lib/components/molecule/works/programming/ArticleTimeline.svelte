<script lang="ts">
	import type { worksProgrammingShortType } from '$lib/types/works/worksProgramming';
	import Autoplay from 'embla-carousel-autoplay';
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	type dataType = {
		[key: string]: worksProgrammingShortType;
	};
	export let works: dataType;
</script>

<aside
	class="overflow-hidden mt-6"
	use:emblaCarouselSvelte={{
		options: {
			loop: false,
			dragFree: true,
			containScroll: 'trimSnaps',
			align: 'center',
			startIndex: 1
		},
		plugins: [Autoplay()]
	}}
>
	<div class="flex">
		<div class="embla-slide relative">
			<div class="mb-32 mt-4" />
			<div class="absolute inset-x-0 bottom-2">
				<div class="w-full h-4 bg-blue absolute inset-x-0 bottom-16 rounded-l-lg" />
				<p class="text-xl text-center inset-x-0 absolute bottom-24 text-gray-200">
					次回作にご期待ください!
				</p>
			</div>
		</div>
		{#each Object.entries(works) as [id, work]}
			<div class="embla-slide relative">
				<div class="mb-32 mt-4">
					<a class="block" href="/works/programming/{id}">
						<div class="mx-4 my-2">
							<img
								loading="lazy"
								alt="サムネイル"
								src={work.thumbnail}
								class="mx-auto aspect-video w-2/3 md:w-1/2 object-cover rounded-xl"
							/>
							<div class="flex justify-center items-center pt-2">
								{#if work.logo !== false}
									<img
										loading="lazy"
										src={work.logo}
										class="w-10 h-10 mr-2"
										alt="ロゴ"
									/>
								{/if}
								<h2 class="text-xl md:text-2xl">{work.name}</h2>
							</div>
							<p class="text-lg text-center mt-4">{work.summary}</p>
						</div>
					</a>
				</div>
				<div class="absolute inset-x-0 bottom-2">
					<div class="w-full h-4 bg-blue absolute inset-x-0 bottom-16" />
					<div
						class="mx-auto w-12 h-12 bg-yellow rounded-2xl absolute inset-x-0 bottom-12 shadow-xl"
					/>
					<p class="text-center text-xl absolute inset-x-0 bottom-4">
						{work.publishedAt}
					</p>
				</div>
			</div>
		{/each}
		<div class="embla-slide relative">
			<div class="mb-32 mt-4" />
			<div class="absolute inset-x-0 bottom-2">
				<div class="w-full h-4 bg-blue absolute inset-x-0 bottom-16 rounded-r-lg" />
				<p class="text-xl text-center inset-x-0 absolute bottom-24 text-gray-200">
					最後までご覧いただきありがとうございました！
				</p>
			</div>
		</div>
	</div>
</aside>

<style>
	/* sp */
	.embla-slide {
		flex: 0 0 100%;
		min-width: 0;
	}
	/* tablet */
	@media (min-width: 768px) {
		.embla-slide {
			flex: 0 0 70%;
			min-width: 0;
		}
	}
	/* pc */
	@media (min-width: 1024px) {
		.embla-slide {
			flex: 0 0 50%;
			min-width: 0;
		}
	}
</style>
