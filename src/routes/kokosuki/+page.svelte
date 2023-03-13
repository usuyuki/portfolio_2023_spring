<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>ここすき</title>
	<meta name="description" content="ここすきポイントについてです" />
</svelte:head>

<div class="flex justify-center items-center flex-col">
	{#each data.data as works}
		<div class="flex mx-4 my-2">
			<h2 class="text-2xl">{works.name}</h2>
			<p>---</p>
			<p class="text-xl">{works.content}</p>
		</div>
	{/each}
</div>
