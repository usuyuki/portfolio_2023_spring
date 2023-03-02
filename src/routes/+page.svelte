<script lang="ts">
	import NormalButton from '$lib/components/Button/normalButton.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	console.log(data.info.log);
</script>

<svelte:head>
	<title>うすゆきどっとねっと</title>
	<meta name="description" content="うすゆきのポートフォリオです" />
</svelte:head>

<h2 class="text-center my-40 mx-4">{data.info.greeting}</h2>


<!-- うすゆきについて -->
<p class="h2 text-center font-serif text-2xl mb-12">うすゆきについて</p>
<NormalButton title="もっと知る！" url="/about" bgColorVariable="blue" textColorVariable="black" />

<!-- かきもの -->
<div class="flex">
<div class="w-full md:w-1/2">
<p class="h2 text-center font-serif text-2xl mt-20 mb-2">かきもの</p>
<NormalButton
	title="もっとよむ?"
	url="/works/programming"
	bgColorVariable="yellow"
	textColorVariable="black"
/>
</div>
<div class="w-full md:w-1/2">
<div class="flex justify-center items-center flex-wrap">
	{#each data.blog as article}
		<a href={article.link} target="_blank" rel="noopener noreferrer">
			<div class="flex flex-col justify-center items-center mx-4 my-2">
				<h2 class="text-xl">{article.title}</h2>
				<img src={article.thumbnail} alt={article.title} class="w-24 h-24" />
			</div>
		</a>
	{/each}
</div>
</div>
</div>

<!-- つくったもの -->
<div class="flex">
<div class="w-full md:w-1/2">
</div>
<div class="w-full md:w-1/2">
<p class="h2 text-center font-serif text-2xl mt-20 mb-2">つくったもの</p>
<NormalButton
	title="もっとよむ?"
	url="/works/programming"
	bgColorVariable="pink"
	textColorVariable="black"
/>
</div>
</div>

<!-- ここすき -->
<p class="h2 text-center font-serif text-2xl mt-20 mb-2">ORETOKU</p>
<NormalButton title="スキを集めています" url="/about" bgColorVariable="black" textColorVariable="white" />
