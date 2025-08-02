<script lang="ts">
import AccessCounter from "$lib/animations/molecule/index/AccessCounter.svelte";
import Opening from "$lib/animations/molecule/index/Opening.svelte";
import SnsMenu from "$lib/animations/molecule/index/SNSMenu.svelte";
import WelcomeGreeting from "$lib/animations/molecule/index/WelcomeGreeting.svelte";
import usuyukiIcon from "$lib/assets/icon/usuyukiIcon.png";
import NormalButton from "$lib/components/atom/button/NormalButton.svelte";
import NormalHead from "$lib/components/atom/head/NormalHead.svelte";
import { portfolioVersionLogger } from "$lib/utils/console/portfolioVersionLogger";
import { snsLinkProvider } from "$lib/utils/console/snsLinkProvider";
import { tuyotuyoConsole } from "$lib/utils/console/tuyotuyoConsole";
import type { PageData } from "./$types";
export let data: PageData;
portfolioVersionLogger();
tuyotuyoConsole(data.info.log);
snsLinkProvider();
</script>

<NormalHead title="トップ" description="うすゆきのポートフォリオです" />

<!-- 最初のアニメーション -->
<div class="relativ">
	<Opening />
</div>

<div class="flex justify-center flex-col items-center">
	<img
		alt="うすゆきアイコン"
		class="w-40 h-40 rounded-full hover:shadow-xl duration-300"
		src={usuyukiIcon}
	/>
	<h2 class="text-2xl mb-4">うすゆきです</h2>
</div>
<SnsMenu />
<!-- アクセスカウンタ -->
<AccessCounter count={data.accessCounterValue} />

<WelcomeGreeting greeting={data.info.greeting} />

<!-- つくったもの -->
<div class="flex flex-wrap mt-20">
	<div class="w-1/2 md:w-4/5 flex items-center flex-wrap justify-center">
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
	<div class="w-1/2 md:w-1/5 flex flex-col items-center justify-center">
		<p class="h2 text-center font-serif text-2xl mb-2">つくったもの</p>
		<NormalButton
			title="もっとみる!"
			url="/works/programming"
			bgColorVariable="pink"
			textColorVariable="black"
		/>
	</div>
	<div class="w-full mt-12">
		<h2 class="text-center text-xl">プログラミング以外もあります!</h2>
		<div class="flex justify-center items-center flex-wrap mt-4">
			<NormalButton
				className="p-2"
				title="動画作品"
				url="/works/videos"
				bgColorVariable="black"
				textColorVariable="blue"
			/>
			<NormalButton
				className="p-2"
				title="スライド"
				url="/works/slides"
				bgColorVariable="black"
				textColorVariable="blue"
			/>
		</div>
	</div>
</div>

<!-- かきもの -->
<div class="flex mt-40">
	<div class="w-full md:w-1/5 flex flex-col items-center justify-center">
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
			<!-- 本番だけなぜか絶対に取得に失敗する -->
			<p>ぜひうすゆきブログも見てみてください！！</p>
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

<!-- うすゆきについて -->
<p class="h2 text-center font-serif text-2xl mb-4 mt-40">うすゆきについて</p>
<NormalButton title="もっと知る!" url="/about" bgColorVariable="blue" textColorVariable="black" />

<!-- <p class="h2 text-center font-serif text-2xl mt-20 mb-2">ORETOKU</p>
<NormalButton
	title="スキを集めています"
	url="/oretoku"
	bgColorVariable="black"
	textColorVariable="white"
/> -->
