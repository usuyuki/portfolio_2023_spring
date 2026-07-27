<script lang="ts">
	import AccessCounter from "$lib/animations/molecule/index/AccessCounter.svelte";
	import MisskeyRecentNotes from "$lib/animations/molecule/index/MisskeyRecentNotes.svelte";
	import Opening from "$lib/animations/molecule/index/Opening.svelte";
	import SnsMenu from "$lib/animations/molecule/index/SNSMenu.svelte";
	import WelcomeGreeting from "$lib/animations/molecule/index/WelcomeGreeting.svelte";
	import usuyukiIcon from "$lib/assets/icon/usuyukiIcon.png";
	import NormalHead from "$lib/components/atom/head/NormalHead.svelte";
	import { pressEasing } from "$lib/utils/actions/pressEasing";
	import { bgClasses } from "$lib/utils/bgClasses";
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

<!-- ヒーロー: RPGのタイトル画面風 -->
<section class="flex flex-col items-center text-center px-4 py-12">
	<h1 class="hero-title">うすゆき</h1>

	<img
		alt="うすゆきアイコン"
		use:pressEasing
		class="w-32 h-32 rounded-full object-cover mt-11 border-4 border-black shadow-[6px_6px_0_var(--yellow)]"
		src={usuyukiIcon}
	/>

	<SnsMenu />
	<!-- アクセスカウンタ -->
	<AccessCounter count={data.accessCounterValue} />

	<WelcomeGreeting greeting={data.info.greeting} />

	<!-- Misskeyの最近の投稿 -->
	<MisskeyRecentNotes notes={data.misskeyNotes} />
</section>

<!-- かきもの -->
<section class="sec">
	<div class="sec-head">
		<h2 class="serif">かきもの</h2>
	</div>
	{#if data.blogs.length === 0}
		<!-- 本番だけなぜか絶対に取得に失敗する -->
		<p class="text-center">ぜひうすゆきブログも見てみてください！！</p>
	{:else}
		<div class="flex flex-col gap-4">
			{#each data.blogs as article, index}
				<a
					href={article.link}
					target="_blank"
					rel="noopener noreferrer"
					use:pressEasing
					class="box log-row {bgClasses[index % bgClasses.length]}"
				>
					<span class="tag log-idx">{String(index + 1).padStart(2, '0')}</span>
					<span class="log-title">{article.title}</span>
					<span class="tag log-arrow">→</span>
				</a>
			{/each}
		</div>
	{/if}
	<div class="flex justify-center mt-10">
		<a href="https://blog.usuyuki.net" use:pressEasing class="box btn-rpg bg-yellow">もっとよむ?</a>
	</div>
</section>

<!-- つくったもの -->
<section class="sec">
	<div class="sec-head">
		<h2 class="serif">つくったもの</h2>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
		{#each data.works as article, index}
			<a
				href={"works/programming/" + article.id}
				use:pressEasing
				class="box qcard {bgClasses[index % bgClasses.length]}"
			>
				<img
					src={article.thumbnail}
					alt={article.name + "サムネイル"}
					class="w-full h-36 object-cover"
				/>
				<div class="p-5">
					<span class="tag num">FILE_{String(index + 1).padStart(2, '0')}</span>
					<h3 class="text-xl mt-2 leading-snug">{article.name}</h3>
				</div>
			</a>
		{/each}
	</div>
	<div class="flex justify-center mt-10">
		<a href="/works/programming" use:pressEasing class="box btn-rpg bg-pink">もっとみる!</a>
	</div>
</section>

<!-- プログラミング以外もあります -->
<section class="sec">
	<div class="sec-head">
		<h2 class="serif">プログラミング以外もあります!</h2>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
		<a href="/works/videos" use:pressEasing class="box tile bg-black text-white">
			<span class="tag code">CATEGORY / VIDEO</span>
			<h3 class="serif">動画作品</h3>
		</a>
		<a href="/works/slides" use:pressEasing class="box tile bg-yellow">
			<span class="tag code">CATEGORY / SLIDES</span>
			<h3 class="serif">スライド</h3>
		</a>
	</div>
</section>

<!-- うすゆきについて -->
<section class="sec">
	<div class="box about-box bg-blue">
		<h2 class="serif">うすゆきについて</h2>
		<p class="tag mt-2 mb-7">経歴 / スタック / 人となり、まとめて見る</p>
		<a href="/about" use:pressEasing class="box btn-rpg bg-black text-white">もっと知る!</a>
	</div>
</section>

<style>
	.sec {
		padding: 90px 4px;
		max-width: 1200px;
		margin: 0 auto;
	}
	.sec-head {
		display: flex;
		align-items: flex-end;
		gap: 20px;
		margin-bottom: 40px;
		flex-wrap: wrap;
	}
	.sec-head h2 {
		font-size: clamp(28px, 5.5vw, 56px);
		margin: 0;
		line-height: 1;
	}
	.tag {
		font-family: var(--tag-font);
	}
	.qcard {
		padding: 0;
		overflow: hidden;
	}
	.qcard .num {
		font-size: 12px;
		opacity: 0.55;
	}
	.tile {
		display: block;
		padding: 44px 30px;
		text-align: center;
	}
	.tile .code {
		font-size: 12px;
		opacity: 0.7;
	}
	.tile h3 {
		font-size: 30px;
		margin-top: 10px;
	}
	.log-row {
		display: flex;
		align-items: center;
		gap: 18px;
		padding: 18px 22px;
		box-shadow: 5px 5px 0 var(--black);
	}
	.log-idx {
		font-size: 20px;
		font-weight: bold;
		width: 34px;
	}
	.log-title {
		flex: 1;
		font-size: 18px;
		font-weight: bold;
	}
	.log-arrow {
		font-size: 18px;
	}
	.about-box {
		padding: 70px 30px;
		text-align: center;
	}
	.about-box h2 {
		font-size: clamp(28px, 5vw, 50px);
		margin: 0 0 14px;
	}
</style>
