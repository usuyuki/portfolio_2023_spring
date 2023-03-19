<script lang="ts">
	import NormalHead from '$lib/components/atom/head/NormalHead.svelte';
	import NormalPageTitle from '$lib/components/atom/text/sentence/NormalPageTitle.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<NormalHead title="ここすき" slug="/kokosuki" description="すきなものを表現するページ" />
<NormalPageTitle title="ここすき" />

<div class="flex justify-center items-center flex-col">
	{#each data.data as works}
		<div class="flex mx-4 my-2 w-full">
			<h2 class="text-2xl w-1/2 text-right mr-4">{works.name}</h2>
			<p class="text-xl w-1/2 text-left">{works.content}</p>
		</div>
	{/each}
</div>
