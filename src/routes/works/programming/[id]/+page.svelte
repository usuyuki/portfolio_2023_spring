<script lang="ts">
	import PossibleLinkButton from '$lib/components/atom/button/PossibleLinkButton.svelte';
	import NormalHead from '$lib/components/atom/head/NormalHead.svelte';
	import SentenceFrame from '$lib/components/atom/text/sentence/SentenceFrame.svelte';
	import WordForTag from '$lib/components/atom/text/word/WordForTag.svelte';
	import WordWithEmoji from '$lib/components/atom/text/word/WordWithEmoji.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<NormalHead
	title={data.data.name}
	slug={`/works/programming/${data.data.slug}`}
	description={data.data.summary}
	ogImage={data.data.gallery[0]}
/>

<div class="flex justify-center items-center md:flex-row flex-col mb-4 md:mb-4">
	{#if data.data.logo !== false}
		<img loading="lazy" src={data.data.logo} class="w-10 h-10 mr-2 object-contain" alt="ロゴ" />
	{/if}

	<h1 class="text-3xl font-serif">{data.data.name}</h1>
</div>
<div class="mb-6 flex justify-center items-center mx-4 md:mx-0">
	<p class="">
		{data.data.summary}
	</p>
</div>

<div class="flex justify-center md:block">
	<div class="md:flex justify-center flex-wrap items-stretch mt-2 mb-6">
		<WordWithEmoji
			className="mb-4 md:mb-0"
			emoji="🚀"
			emojiMean="ローンチ日"
			content={data.data.publishedAt}
		/>
		<WordWithEmoji
			className="mb-4 md:mb-0"
			emoji="🙎"
			emojiMean="開発形態"
			content={data.data.form.name}
		/>
		<WordWithEmoji
			className="mb-4 md:mb-0"
			emoji="🍽"
			emojiMean="ジャンル"
			content={data.data.genre.name}
		/>
		<WordWithEmoji
			className="mb-4 md:mb-0"
			emoji="🏹"
			emojiMean="誰のために作った？"
			content={data.data.toWhom}
		/>
	</div>
</div>

<div class="flex justify-center items-center flex-row mb-20 mt-4">
	<PossibleLinkButton title="GitHub🐙" link={data.data.gitHub} />
	<PossibleLinkButton title="サイト🔗" link={data.data.link} />
</div>

<!-- 使用技術 -->
<div class="relative shadow-inner rounded-xl mb-12 p-4 w-full">
	<div class="flex justify-center absolute inset-x-0 -top-4">
		<h2 class="text-xl text-center font-serif bg-white px-4 rounded-2xl">技術</h2>
	</div>
	<div class="flex justify-center flex-wrap items-stretch my-4">
		{#each data.data.tech as tech}
			<WordForTag title={tech.name} />
		{/each}
	</div>
</div>

<div class="flex justify-center flex-wrap items-stretch mt-16 mb-6">
	<SentenceFrame
		className="md:w-1/2 w-full mb-6"
		title="目的"
		content={data.data.whatToOffer}
		borderColor="pink"
	/>
	<SentenceFrame
		className="md:w-1/2 w-full mb-6"
		title="背景"
		content={data.data.background}
		borderColor="blue"
	/>
	<SentenceFrame
		className="md:w-1/2 w-full mb-6"
		title="こだわり"
		content={data.data.kodawari}
		borderColor="yellow"
	/>
</div>
{#if data.data.content !== null}
	<div class="w-full px-12 pt-2 pb-4 shadow-sm rounded-xl">
		{@html data.data.content}
	</div>
{/if}

<div class="relative border-2 border-double border-black rounded-xl m-4 mt-20 mb-40">
	<div class="flex justify-center absolute inset-x-0 -top-6">
		<h2 class="text-2xl text-center font-serif bg-white px-4 rounded-2xl">ギャラリー</h2>
	</div>
	<div class="flex flex-wrap justify-center p-4">
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
