<script lang="ts">
	import type { PageData } from '../$types';
	export let data: PageData;
</script>

<slot />

<aside>
	<div class="flex justify-center items-stretch">
		{#each Object.entries(data.data) as [id, work]}
			<div class="w-full md:w-1/2">
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
				<div class="mx-auto w-12 h-12 bg-blue rounded-full" />
			</div>
		{/each}
	</div>
</aside>
