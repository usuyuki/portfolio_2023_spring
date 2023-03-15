<script lang="ts">
	import NormalButton from '$lib/components/atom/button/NormalButton.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>あばうと</title>
	<meta name="description" content="うすゆきについて" />
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
<NormalButton
	title="うすゆきのここすき"
	url="/kokosuki"
	bgColorVariable="pink"
	textColorVariable="black"
/>
<NormalButton
	title="技術スタック"
	url="/techStack"
	bgColorVariable="blue"
	textColorVariable="black"
/>
