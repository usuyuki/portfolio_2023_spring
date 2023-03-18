<script lang="ts">
	import FirstView from '$lib/animations/firstView.svelte';
	import usuyukiIcon from '$lib/assets/icon/usuyukiIcon.jpg';
	import NormalButton from '$lib/components/atom/button/NormalButton.svelte';
	import { portfolioVersionLogger } from '$lib/utils/console/portfolioVersionLogger';
	import { snsLinkProvider } from '$lib/utils/console/snsLinkProvider';
	import { tuyotuyoConsole } from '$lib/utils/console/tuyotuyoConsole';
	import type { PageData } from './$types';
	export let data: PageData;
	portfolioVersionLogger();
	tuyotuyoConsole(data.info.log);
	snsLinkProvider();
</script>

<svelte:head>
	<title>うすゆきどっとねっと</title>
	<meta name="description" content="うすゆきのポートフォリオです" />
</svelte:head>

<div class="relativ">
	<FirstView />
</div>

<div class="flex justify-center flex-col items-center">
	<img
		alt="うすゆきアイコン"
		class="w-40 h-40 rounded-full hover:shadow-xl duration-300"
		src={usuyukiIcon}
	/>
	<h2 class="text-2xl ">うすゆきです</h2>
</div>

<h2 class="text-center my-40 mx-4">{data.info.greeting}</h2>

<!-- アクセスカウンタ -->
<h3 class="text-center text-2xl">あなたは{data.accessCounterValue}番目の訪問者です！</h3>

<!-- うすゆきについて -->
<p class="h2 text-center font-serif text-2xl mb-12">うすゆきについて</p>
<NormalButton title="もっと知る！" url="/about" bgColorVariable="blue" textColorVariable="black" />

<!-- かきもの -->
<div class="flex mt-20">
	<div class="w-full md:w-1/5 flex flex-col items-center justify-center ">
		<p class="h2 text-center font-serif text-2xl mb-2">かきもの</p>
		<NormalButton
			title="もっとよむ?"
			url="https://blog.usuyuki.net"
			bgColorVariable="yellow"
			textColorVariable="black"
		/>
	</div>
	<div class="w-full md:w-4/5 flex items-center flex-wrap justify-center">
		{#if data.blogs.length === 0}
			<p>ブログの取得に失敗しました...😢</p>
		{:else}
			{#each data.blogs as article}
				<a class="md:w-1/3" href={article.link} target="_blank" rel="noopener noreferrer">
					<div class="flex flex-col justify-center items-center mx-4 my-2">
						<img
							src={article.thumbnail}
							alt={article.title + 'サムネイル'}
							class="w-24 h-24 rounded-lg object-cover"
						/>
						<h3 class="text-lg md:text-xl">{article.title}</h3>
					</div>
				</a>
			{/each}
		{/if}
	</div>
</div>

<!-- つくったもの -->
<div class="flex mt-40">
	<div class="w-full md:w-4/5 flex items-center flex-wrap justify-center">
		{#each data.works as article}
			<a href={'works/programming/' + article.id} class="md:w-1/3">
				<div class="flex flex-col justify-center items-center mx-4 my-2">
					<img
						src={article.thumbnail}
						alt={article.name + 'サムネイル'}
						class="w-24 h-24 rounded-lg object-cover"
					/>
					<h3 class="text-lg md:text-xl">{article.name}</h3>
				</div>
			</a>
		{/each}
	</div>
	<div class="w-full md:w-1/5 flex flex-col items-center justify-center ">
		<p class="h2 text-center font-serif text-2xl mb-2">つくったもの</p>
		<NormalButton
			title="もっとみる!"
			url="/works/programming"
			bgColorVariable="pink"
			textColorVariable="black"
		/>
	</div>
</div>

<p class="h2 text-center font-serif text-2xl mt-20 mb-2">ORETOKU</p>
<NormalButton
	title="スキを集めています"
	url="/oretoku"
	bgColorVariable="black"
	textColorVariable="white"
/>
