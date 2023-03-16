<script lang="ts">
	import SentenceFrame from '$lib/components/atom/text/sentence/SentenceFrame.svelte';
	import WordWithEmoji from '$lib/components/atom/text/word/WordWithEmoji.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>{data.data.name}</title>
	<meta name="description" content={data.data.summary} />
</svelte:head>
<h1 class="text-3xl text-center font-serif">{data.data.name}</h1>
<div class="flex justify-center flex-wrap items-stretch my-6">
<WordWithEmoji emoji="🚀" content={data.data.publishedAt} />
<WordWithEmoji emoji="🧍" content={data.data.toWhom} />
<WordWithEmoji emoji="🍽" content={data.data.whatToOffer} />
</div>
<div class="flex justify-center flex-wrap items-stretch my-6">
<SentenceFrame className="w-full" title="ひとことで" content={data.data.summary} borderColor="pink"/>
<SentenceFrame className="md:w-1/2" title="背景" content={data.data.background} borderColor="yellow"/>
<SentenceFrame className="md:w-1/2" title="こだわり" content={data.data.kodawari} borderColor="blue"/>
</div>

<div class="flex justify-center items-center flex-row mb-4">
	<p>
<a href={data.data.gitHub} 
		target="_blank"
		rel="noopener noreferrer"
class="text-xl mx-2 my-4 rounded-2xl border-2 border-dotted p-2">GitHub🐙</a>
	</p>
	<p>
<a href={data.data.link}
		target="_blank"
		rel="noopener noreferrer"
class="text-xl mx-2 my-4 rounded-2xl border-2 border-dotted p-2">サイト🔗</a>
	</p>
</div>

<h2 class="text-2xl text-center font-serif">ギャラリー</h2>

<div class="flex flex-wrap justify-center">
{#each data.data.gallery as image}
	<img src={image} alt={data.data.name} class="md:w-1/2 p-2" loading="lazy" />
{/each}
</div>
