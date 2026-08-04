<script lang="ts">
	import NormalHead from "$lib/components/atom/head/NormalHead.svelte";
	import ArticleTimeline from "$lib/components/molecule/works/programming/ArticleTimeline.svelte";
	import { pressEasing } from "$lib/utils/actions/pressEasing";
	import { bgClasses } from "$lib/utils/bgClasses";
	import { fade, scale } from "svelte/transition";
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

	// ギャラリー画像の拡大表示用。nullなら非表示
	let expandedImage: string | null = $state(null);
	// object-fit:containだと画像要素の当たり判定が実描画サイズより大きくなり、
	// はみ出た余白をクリックしてもオーバーレイの外側クリック扱いにならないため、
	// 画像の実サイズに合わせてaspect-ratioを設定し当たり判定を実描画サイズに一致させる
	let expandedImageAspectRatio: string | undefined = $state(undefined);
	// 拡大表示を開いたときのトリガー要素。閉じたときにフォーカスを戻すために保持する
	let expandedImageTrigger: HTMLElement | null = null;
	let overlayCloseButton: HTMLButtonElement | undefined = $state();

	// SvelteKitは[id]ページのコンポーネントインスタンスを再利用するため、
	// 別作品への遷移時にライトボックスの開閉状態を引き継がないようリセットする
	$effect(() => {
		data;
		closeExpandedImage();
	});

	function openExpandedImage(image: string, trigger: HTMLElement) {
		expandedImage = image;
		expandedImageTrigger = trigger;
	}

	function closeExpandedImage() {
		expandedImage = null;
		expandedImageAspectRatio = undefined;
		expandedImageTrigger?.focus();
		expandedImageTrigger = null;
	}

	// naturalWidth/naturalHeightからaspect-ratio文字列を作る共通処理。
	// 読み込み失敗時(naturalWidth === 0)はCSSのaspect-ratioを未設定のままにする
	function applyAspectRatioFromImage(img: HTMLImageElement) {
		if (img.naturalWidth > 0) {
			expandedImageAspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`;
		}
	}

	function handleExpandedImageLoad(event: Event) {
		applyAspectRatioFromImage(event.currentTarget as HTMLImageElement);
	}

	// キャッシュ済み画像はDOM挿入時に既にcomplete済みでloadイベントが発火しないため、マウント時点でも判定する
	function setInitialAspectRatio(img: HTMLImageElement) {
		if (img.complete) applyAspectRatioFromImage(img);
	}

	// Escapeに加えEnter/Spaceでも閉じられるようにする(role="button"を名乗る以上、ボタンの活性化キーに応答する必要がある)
	function handleOverlayKeydown(event: KeyboardEvent) {
		if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			closeExpandedImage();
		}
	}

	$effect(() => {
		if (expandedImage !== null) overlayCloseButton?.focus();
	});

	function handleOverlayFocusTrap(event: KeyboardEvent) {
		if (event.key !== "Tab" || !overlayCloseButton) return;
		// オーバーレイ内でフォーカス可能な要素は閉じるボタンのみのため、常にそこへ留める
		event.preventDefault();
		overlayCloseButton.focus();
	}
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
		<div class="gallery-grid" class:gallery-grid-single={data.data.gallery.length === 1}>
			{#each data.data.gallery as image, index}
				<div class="box gallery-item {bgClasses[index % bgClasses.length]}">
					<button
						type="button"
						class="gallery-item-btn"
						onclick={(e) => openExpandedImage(image, e.currentTarget)}
						aria-label="画像を拡大表示"
					>
						<img src={image} alt={data.data.name} loading="lazy" />
						<span class="gallery-item-hover-dim" aria-hidden="true"></span>
						<span class="gallery-item-zoom-icon" aria-hidden="true">
							<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M9 4H5a1 1 0 0 0-1 1v4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
								<path d="M15 4h4a1 1 0 0 1 1 1v4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
								<path d="M9 20H5a1 1 0 0 1-1-1v-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
								<path d="M15 20h4a1 1 0 0 0 1-1v-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
							</svg>
						</span>
					</button>
				</div>
			{/each}
		</div>
	</section>
{/if}

{#if expandedImage !== null}
	<div
		class="image-overlay"
		role="button"
		tabindex="0"
		onclick={closeExpandedImage}
		onkeydown={(e) => {
			handleOverlayKeydown(e);
			handleOverlayFocusTrap(e);
		}}
		aria-label="拡大表示を閉じる"
		transition:fade={{ duration: 180 }}
	>
		<!-- 画像クリックでオーバーレイの閉じる処理が発火しないようにするための伝播停止ラッパー。バツボタンは画像の右上角に追随させる -->
		<div
			class="image-overlay-img-wrap"
			class:image-overlay-img-wrap-fallback={expandedImageAspectRatio === undefined}
			role="presentation"
			onclick={(e) => e.stopPropagation()}
			transition:scale={{ duration: 220, start: 0.9, opacity: 0 }}
			style:aspect-ratio={expandedImageAspectRatio}
		>
			<img
				src={expandedImage}
				alt={data.data.name}
				class="image-overlay-img"
				onload={handleExpandedImageLoad}
				onerror={() => (expandedImageAspectRatio = undefined)}
				use:setInitialAspectRatio
			/>
			<button
				type="button"
				bind:this={overlayCloseButton}
				class="image-overlay-close"
				onclick={closeExpandedImage}
				aria-label="拡大表示を閉じる"
			>
				<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
					<line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
				</svg>
			</button>
		</div>
	</div>
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
	.gallery-grid {
		column-count: 2;
		column-gap: 24px;
	}
	@media (min-width: 768px) {
		.gallery-grid {
			column-count: 3;
		}
	}
	.gallery-grid-single {
		column-count: 1;
	}
	.gallery-grid-single .gallery-item {
		max-width: 500px;
		margin-left: auto;
		margin-right: auto;
	}
	.gallery-item {
		padding: 0;
		overflow: hidden;
		break-inside: avoid;
		margin-bottom: 24px;
	}
	.gallery-item img {
		width: 100%;
		height: auto;
		aspect-ratio: 16 / 9;
		object-fit: contain;
		display: block;
	}
	.gallery-item-btn {
		position: relative;
		display: block;
		width: 100%;
		padding: 0;
		border: none;
		background: none;
		cursor: pointer;
		/* column-countのmasonryはタブ順と視覚順がずれるため、Tab移動時に対象が画面内に入るようスクロール余白を確保する */
		scroll-margin: 24px;
	}
	.gallery-item-btn:focus-visible {
		outline: 3px solid var(--black);
		outline-offset: 2px;
		z-index: 1;
	}
	.gallery-item-hover-dim {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.35);
		opacity: 0;
		transition: opacity 0.15s ease-out;
	}
	.gallery-item-btn:hover .gallery-item-hover-dim,
	.gallery-item-btn:focus-visible .gallery-item-hover-dim {
		opacity: 1;
	}
	.gallery-item-zoom-icon {
		position: absolute;
		right: 12px;
		bottom: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.gallery-item-zoom-icon svg {
		width: 28px;
		height: 28px;
		color: var(--white);
		filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.6));
	}
	.image-overlay {
		position: fixed;
		inset: 0;
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 40px;
		background: rgba(0, 0, 0, 0.85);
		cursor: zoom-out;
	}
	.image-overlay-img-wrap {
		position: relative;
		max-width: 100%;
		max-height: 100%;
		cursor: default;
	}
	/* aspect-ratio未確定時(読込中/読込失敗)のフォールバック。閉じるボタンが極端な位置にならない最低サイズを確保する */
	.image-overlay-img-wrap-fallback {
		width: min(320px, 80vw);
		height: min(320px, 80vh);
	}
	.image-overlay-img {
		display: block;
		width: 100%;
		height: 100%;
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}
	.image-overlay-close {
		position: absolute;
		top: -20px;
		right: -20px;
		z-index: 1001;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		padding: 0;
		border: none;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.9);
		cursor: pointer;
	}
	.image-overlay-close svg {
		width: 22px;
		height: 22px;
		color: var(--black);
	}
</style>
