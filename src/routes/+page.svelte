<script lang="ts">
	import { onDestroy } from "svelte";
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
	import { onOpeningFinished } from "$lib/utils/openingEvent";
	import type { PageData } from "./$types";
	export let data: PageData;
	portfolioVersionLogger();
	tuyotuyoConsole(data.info.log);
	snsLinkProvider();

	// アイコンのフェードインをWelcomeGreetingと同じタイミングで発火させる
	// (以前はCSSのanimation-delayにapp.cssの--after-access-counter-timeを直接埋め込んでおり、実際の完了とズレていた)
	let iconStarted = false;
	const unsubscribeIconStart = onOpeningFinished(() => {
		iconStarted = true;
	});
	onDestroy(unsubscribeIconStart);
</script>

<NormalHead title="トップ" description="うすゆきのポートフォリオです" />

<!-- 最初のアニメーション -->
<div class="relativ">
	<Opening />
</div>

<!-- ヒーロー: RPGのタイトル画面風 -->
<section class="hero-section flex flex-col items-center text-center px-4 pb-12">
	<h1 class="hero-title" aria-label="うすゆきどっとねっと">
		{#each "うすゆきどっとねっと".split("") as char, index}
			<span class="hero-title-char" style="--i: {index}">{char}</span>
		{/each}
	</h1>

	<div class="icon-greeting">
		<WelcomeGreeting greeting={data.info.greeting} />
		<img
			alt="うすゆきアイコン"
			use:pressEasing
			class="icon w-32 h-32 rounded-full object-cover border-4 border-black shadow-[6px_6px_0_var(--yellow)]"
			class:started={iconStarted}
			src={usuyukiIcon}
		/>
	</div>

	<SnsMenu />
	<!-- アクセスカウンタ -->
	<AccessCounter count={data.accessCounterValue} />

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
		<a href="/about" use:pressEasing class="box btn-rpg bg-black text-white">もっと知る!</a>
	</div>
</section>

<style>
	.hero-section {
		/* アイコン・吹き出し側(.icon-greeting)からも参照するため、両者の共通の親であるここに置く */
		--ellipse-ry: clamp(95px, 18vw, 260px);
	}
	.hero-title {
		/* 10文字を弧状(半楕円のアーチ)に配置する。span-arc-startからspan-arc-startプラスspan-arcまでの範囲に等間隔で並べる */
		--char-count: 10;
		--arc-span: 130deg;
		--arc-start: calc(-90deg - var(--arc-span) / 2);
		--ellipse-rx: clamp(150px, 30vw, 420px);
		position: relative;
		width: calc(var(--ellipse-rx) * 2 + 1.2em);
		/* 中央付近の文字が最も上に出っ張るため、その高さ(ellipse-ry)+文字半分を確保する。
		   コンテナ下端(top:100%)を基準に全文字が上方向にのみ配置される */
		height: calc(var(--ellipse-ry) + 0.35em);
		margin: 0 auto;
	}
	.hero-title-char {
		position: absolute;
		top: 100%;
		left: 50%;
		font-size: clamp(36px, 7.5vw, 72px);
		/* app.cssの.hero-titleは巨大文字(220px)向けの固定px縁取り/影のため、
		   このサイズ(最大72px)にそのまま使うと相対的に太すぎて滲んで見える。文字サイズに応じたem単位に上書きする */
		-webkit-text-stroke: 0.04em var(--black);
		text-shadow:
			0.08em 0.08em 0 var(--pink),
			0.16em 0.16em 0 var(--black);
		--angle: calc(
			var(--arc-start) + var(--arc-span) / (var(--char-count) - 1) * var(--i)
		);
		translate: calc(var(--ellipse-rx) * cos(var(--angle)))
			calc(var(--ellipse-ry) * sin(var(--angle)));
		transform: translate(-50%, -50%) rotate(calc(var(--angle) + 90deg));
	}
	.icon-greeting {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 4px;
		/* 円弧テキスト(.hero-title)の下の余白ぶん、アイコンと吹き出しを上に引き寄せる。
		   --ellipse-ryが画面幅で伸縮するのに正比例させることで、円弧が小さい(=余白も狭い)画面幅で
		   詰めすぎて重ならないようにする */
		margin-top: calc(var(--ellipse-ry) * -0.35);
	}
	/* WelcomeGreeting(吹き出し)と登場タイミングを揃えるため、同じonOpeningFinishedイベントで発火する。
	   .startedが付くまではplay-state:pausedで0%の状態のまま止めておく */
	.icon-greeting .icon {
		animation: iconFadeUp 0.5s;
		animation-play-state: paused;
		animation-fill-mode: forwards;
		opacity: 0;
	}
	.icon-greeting .icon.started {
		animation-play-state: running;
	}
	@keyframes iconFadeUp {
		from {
			opacity: 0;
			transform: translateY(50px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
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
