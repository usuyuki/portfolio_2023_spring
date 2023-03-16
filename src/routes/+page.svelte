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
<div class="flex">
	<div class="w-full md:w-1/2">
		<p class="h2 text-center font-serif text-2xl mt-20 mb-2">かきもの</p>
		<NormalButton
			title="もっとよむ?"
			url="https://blog.usuyuki.net"
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
						<img
							src={article.thumbnail}
							alt={article.title + '記事サムネイル'}
							class="w-24 h-24"
						/>
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>

<!-- つくったもの -->
<div class="flex">
	<div class="w-full md:w-1/2" />
	<div class="w-full md:w-1/2">
		<p class="h2 text-center font-serif text-2xl mt-20 mb-2">つくったもの</p>
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
