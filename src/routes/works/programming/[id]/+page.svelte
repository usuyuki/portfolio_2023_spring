<script lang="ts">
	import PossibleLinkButton from '$lib/components/atom/button/PossibleLinkButton.svelte';
	import SentenceFrame from '$lib/components/atom/text/sentence/SentenceFrame.svelte';
	import WordWithEmoji from '$lib/components/atom/text/word/WordWithEmoji.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>{data.data.name}</title>
	<meta name="description" content={data.data.summary} />
</svelte:head>
<div class="flex justify-center items-center md:flex-row flex-col mb-12 md:mb-4">
	{#if data.data.logo !== false}
		<img loading="lazy" src={data.data.logo} class="w-10 h-10 mr-2 object-contain" alt="ロゴ" />
	{/if}

	<h1 class="text-3xl font-serif">{data.data.name}</h1>
</div>

<div class="flex justify-center md:block">
	<div class="md:flex justify-center flex-wrap items-stretch mt-2 mb-6">
		<WordWithEmoji emoji="🚀" emojiMean="ローンチ日" content={data.data.publishedAt} />
		<WordWithEmoji emoji="🧍" emojiMean="誰のために作った？" content={data.data.toWhom} />
		<WordWithEmoji emoji="🍽" emojiMean="目的" content={data.data.whatToOffer} />
	</div>
</div>

<div class="flex justify-center items-center flex-row mb-4 mt-8">
	<PossibleLinkButton title="GitHub🐙" link={data.data.gitHub} />
	<PossibleLinkButton title="サイト🔗" link={data.data.link} />
</div>

<div class="flex justify-center flex-wrap items-stretch mt-16 mb-6">
	<SentenceFrame
		className="w-full mb-6"
		title="ひとことで"
		content={data.data.summary}
		borderColor="pink"
	/>
	<SentenceFrame
		className="md:w-1/2 w-full mb-6"
		title="背景"
		content={data.data.background}
		borderColor="black"
	/>
	<SentenceFrame
		className="md:w-1/2 w-full mb-6"
		title="こだわり"
		content={data.data.kodawari}
		borderColor="yellow"
	/>
</div>

<div class="relative border-2 border-double border-black rounded-xl m-4 mt-20 mb-40">
	<div class="flex justify-center absolute inset-x-0 -top-6">
		<h2 class="text-2xl text-center font-serif bg-white px-4 rounded-2xl">ギャラリー</h2>
	</div>
	<div class="flex flex-wrap justify-center p-4 ">
		{#each data.data.gallery as image}
			<img
				src={image}
				alt={data.data.name}
				class="md:w-1/2 p-2 rounded-xl object-contain"
				loading="lazy"
			/>
		{/each}
	</div>
</div>
