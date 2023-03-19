<script lang="ts">
	import NormalHead from '$lib/components/atom/head/NormalHead.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<NormalHead title="ここすき" slug="/kokosuki" description="すきなものを表現するページ" />

<div class="flex justify-center items-center flex-col">
	{#each data.data as works}
		<div class="flex mx-4 my-2">
			<h2 class="text-2xl">{works.name}</h2>
			<p>---</p>
			<p class="text-xl">{works.content}</p>
		</div>
	{/each}
</div>
