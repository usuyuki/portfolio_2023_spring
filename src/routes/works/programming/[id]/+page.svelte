<script lang="ts">
	import NormalHead from "$lib/components/atom/head/NormalHead.svelte";
	import ArticleTimeline from "$lib/components/molecule/works/programming/ArticleTimeline.svelte";
	import { pressEasing } from "$lib/utils/actions/pressEasing";
	import { bgClasses } from "$lib/utils/bgClasses";
	import type { PageData } from "./$types";
	let { data }: { data: PageData } = $props();

	const metaList = $derived([
		{ emoji: "🚀", label: "ローンチ日", value: data.data.publishedAt },
		{ emoji: "🙎", label: "開発形態", value: data.data.form.name },
		{ emoji: "🍽", label: "ジャンル", value: data.data.genre.name },
		{ emoji: "🏹", label: "誰のために作った？", value: data.data.toWhom },
	]);
	const sentenceList = $derived([
		{ title: "目的", content: data.data.whatToOffer, bg: "bg-pink" },
		{ title: "背景", content: data.data.background, bg: "bg-blue" },
		{ title: "こだわり", content: data.data.kodawari, bg: "bg-yellow" },
	]);
</script>

<NormalHead title={data.data.name} description={data.data.summary} ogImage={data.data.gallery[0]} />

<section class="work-hero">
	{#if data.data.logo !== false}
		<img loading="lazy" src={data.data.logo} class="logo" alt="ロゴ" />
	{/if}
	<h1 class="serif work-title">{data.data.name}</h1>
	<p class="mt-2 text-lg">{data.data.summary}</p>

	<div class="flex justify-center flex-wrap gap-3 mt-8">
		{#each metaList as meta}
			<span class="box-tag meta-tag">{meta.emoji} {meta.label}: {meta.value}</span>
		{/each}
	</div>

	<div class="flex justify-center flex-wrap gap-4 mt-8">
		{#if data.data.gitHub}
			<a
				href={data.data.gitHub}
				target="_blank"
				rel="noopener noreferrer"
				use:pressEasing
				class="btn-rpg bg-white">GitHub🐙</a
			>
		{:else}
			<span class="btn-rpg disabled">GitHub🐙</span>
		{/if}
		{#if data.data.link}
			<a
				href={data.data.link}
				target="_blank"
				rel="noopener noreferrer"
				use:pressEasing
				class="btn-rpg bg-yellow">サイト🔗</a
			>
		{:else}
			<span class="btn-rpg disabled">サイト🔗</span>
		{/if}
	</div>
</section>

<!-- 使用技術 -->
<section class="sec">
	<div class="sec-head">
		<h2 class="serif">技術</h2>
	</div>
	<div class="flex justify-center flex-wrap gap-3">
		{#each data.data.tech as tech, index}
			<span class="tag tech-pill {bgClasses[index % bgClasses.length]}">{tech.name}</span>
		{/each}
	</div>
</section>

<!-- 目的・背景・こだわり -->
<section class="sec">
	<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
		{#each sentenceList as sentence}
			<div class="box sentence-box {sentence.bg}">
				<h3 class="serif">{sentence.title}</h3>
				<p class="mt-2">{sentence.content}</p>
			</div>
		{/each}
	</div>
</section>

{#if data.data.content !== null}
	<!-- ここは自分で作ったコードしか入らないのでサニタイズ不要 -->
	<!-- eslint-disable svelte/no-at-html-tags -->
	<section class="sec">
		<div class="box content-box bg-white">
			{@html data.data.content}
		</div>
	</section>
{/if}

<!-- ギャラリー -->
{#if data.data.gallery.length > 0}
	<section class="sec">
		<div class="sec-head">
			<h2 class="serif">ギャラリー</h2>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
			{#each data.data.gallery as image, index}
				<div class="box gallery-item {bgClasses[index % bgClasses.length]}">
					<img src={image} alt={data.data.name} loading="lazy" />
				</div>
			{/each}
		</div>
	</section>
{/if}

<div class="box relative mb-4 mt-16 pb-4 bg-ui-bg">
	<div class="flex absolute inset-x-0 -top-6 justify-center">
		<span class="box-tag serif text-xl px-5 py-1.5">つくったもの！</span>
	</div>
	<!-- data.data(このページの作品)ではなくdata.allWorks(+layout.server.tsから来る全作品一覧)を渡す -->
	<ArticleTimeline works={data.allWorks} />
</div>

<style>
	.work-hero {
		padding: 70px 20px 40px;
		max-width: 900px;
		margin: 0 auto;
		text-align: center;
	}
	.logo {
		width: 64px;
		height: 64px;
		object-fit: contain;
		margin: 0 auto 14px;
		border-radius: 16px;
	}
	.work-title {
		font-size: clamp(28px, 5vw, 48px);
		margin: 0;
	}
	.meta-tag {
		font-family: var(--tag-font);
		font-size: 12px;
	}
	.btn-rpg.disabled {
		opacity: 0.45;
		text-decoration: line-through;
		cursor: not-allowed;
	}
	.sec {
		padding: 40px 4px;
		max-width: 1200px;
		margin: 0 auto;
	}
	.sec-head {
		display: flex;
		justify-content: center;
		margin-bottom: 30px;
	}
	.sec-head h2 {
		font-size: clamp(24px, 4vw, 40px);
		margin: 0;
	}
	.tag {
		font-family: var(--tag-font);
	}
	.tech-pill {
		font-size: 13px;
		padding: 8px 16px;
		border-radius: 999px;
		border: 3px solid var(--black);
	}
	.sentence-box {
		padding: 24px;
	}
	.sentence-box h3 {
		font-size: 18px;
	}
	.content-box {
		padding: 30px;
	}
	.gallery-item {
		padding: 0;
		overflow: hidden;
	}
	.gallery-item img {
		width: 100%;
		height: auto;
		object-fit: contain;
		display: block;
	}
</style>
