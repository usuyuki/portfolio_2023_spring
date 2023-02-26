<script lang="ts">
	import NormalButton from '$lib/components/uiParts/Button/normalButton.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	console.log(data.info.log);
</script>

<h2 class="text-center">{data.info.greeting}</h2>

<p class="h2 text-center font-serif text-2xl">うすゆきについて</p>
<NormalButton title="もっと知る！" url="/about" bgColorVariable="blue" textColorVariable="black" />


<div class="flex justify-center items-center flex-wrap">
	{#each data.blog as article}
		<a href={article.link} target="_blank" rel="noopener noreferrer">
			<div class="flex flex-col justify-center items-center mx-4 my-2">
			<h2 class="text-xl">{article.title}</h2>
			<img src={article.thumbnail} alt={article.name} class="w-24 h-24"/>
			</div>
		</a>
	{/each}
</div>
