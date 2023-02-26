<script lang="ts">
	import type { PageData } from '../$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>Works</title>
	<meta name="description" content="ぷろぐらみんぐでつくったもの" />
</svelte:head>

<div class="flex justify-center flex-wrap">
	{#each Object.entries(data.data) as [id, work]}
		<a href="/works/programming/{id}" data-sveltekit-preload-data="hover">
			<div class="mx-4 my-2">
				<h2 class="text-2xl">{work.name}</h2>
				<p class="text-xl">{work.summary}</p>
			</div>
		</a>
	{/each}
</div>
