<script lang="ts">
	import type { PageData } from '../$types';
	export let data: PageData;
</script>

<slot />

<aside>
	<div class="flex justify-center flex-wrap">
		{#each Object.entries(data.data) as [id, work]}
			<a href="/works/programming/{id}">
				<div class="mx-4 my-2">
					<img loading="lazy" src={work.logo} class="w-12 h-12 " alt="thumbnail" />
					<h2 class="text-2xl">{work.name}</h2>
					<p class="text-xl">{work.summary}</p>
				</div>
			</a>
		{/each}
	</div>
</aside>
