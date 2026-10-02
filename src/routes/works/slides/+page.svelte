<script lang="ts">
	import { tick } from "svelte";
	import NormalHead from "$lib/components/atom/head/NormalHead.svelte";
	import NormalPageTitle from "$lib/components/atom/text/sentence/NormalPageTitle.svelte";
	import { pressPulse } from "$lib/utils/actions/pressEasing";
	import { mediaCardVariants } from "$lib/utils/mediaCardVariants";
	import { speakerDeckThumbnail } from "$lib/utils/speakerDeckThumbnail";
	import type { PageData } from "./$types";
	export let data: PageData;

	// ジャンルをまたいでも色のローテーションが途切れないよう、全ジャンル通しの連番を先に振っておく
	let cardIndex = 0;
	const cardIndexByGenre = Object.fromEntries(
		Object.entries(data.data).map(([genre, slides]) => [
			genre,
			slides.map(() => cardIndex++),
		]),
	);

	// iframeの中身が検索結果に出ないよう、クリックされるまではサムネイルにしておく(クローラーはクリックしない)
	let loadedSlides = new Set<string>();
	// 押したボタンはiframeに置き換わって消えるので、キーボード操作が途切れないようフォーカスを移す
	const loadSlide = async (url: string, card: HTMLElement | null) => {
		if (card) pressPulse(card);
		loadedSlides = new Set(loadedSlides).add(url);
		await tick();
		card?.querySelector("iframe")?.focus();
	};
</script>

<NormalHead title="スライド" description="登壇などで使用したスライドの一覧ページです" />
<NormalPageTitle title="スライド" tag="SLIDES" />

{#each Object.entries(data.data) as [title, slides]}
	<h2 class="genre-title serif">{title}</h2>
	<div class="media-grid vgrid">
		{#each slides as slide, index}
			{@const variant = mediaCardVariants[cardIndexByGenre[title][index] % mediaCardVariants.length]}
			<div class="box vcard {variant.bg} {variant.text}">
				{#if loadedSlides.has(slide.slideIframe)}
					<iframe
						class="frame"
						src={slide.slideIframe}
						title="Speaker Deck Iframe"
						frameborder="0"
						allowfullscreen={false}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					></iframe>
				{:else}
					{@const thumbnail = speakerDeckThumbnail(slide.slideIframe)}
					<button
						type="button"
						class="frame slide-placeholder"
						aria-label="{slide.name}のスライドを表示"
						on:click={(event) =>
							loadSlide(slide.slideIframe, event.currentTarget.closest(".vcard"))}
					>
						{#if thumbnail}
							<img class="thumbnail" src={thumbnail} alt="" loading="lazy" />
						{/if}
					</button>
				{/if}
				<div class="body">
					<span class="tag date">{slide.publishedAt}</span>
					<h2 class="serif">{slide.name}</h2>
					<p>{slide.description}</p>
				</div>
			</div>
		{/each}
	</div>
{/each}

<style>
	.genre-title {
		text-align: center;
		font-size: 24px;
		margin: 40px 0 24px;
	}
	.vgrid {
		margin: 0 auto 60px;
	}
	.slide-placeholder {
		position: relative;
		display: block;
		padding: 0;
		overflow: hidden;
		background: rgba(0, 0, 0, 0.08);
		cursor: pointer;
	}
	.slide-placeholder .thumbnail {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
