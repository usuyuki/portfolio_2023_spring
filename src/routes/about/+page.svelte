<svelte:head>
    <title>あばうと</title> 
</svelte:head>
<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="flex justify-center items-center flex-col">
	{#each data.data as works}
		<div class="flex mx-4 my-2">
			<h2 class="text-2xl">{works.name}</h2>
			<p>
			---
			</p>
			<p class="text-xl">{works.content}</p>
		</div>
	{/each}
</div>
