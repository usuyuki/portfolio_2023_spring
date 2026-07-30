<script lang="ts">
	import NormalHead from "$lib/components/atom/head/NormalHead.svelte";
	import NormalPageTitle from "$lib/components/atom/text/sentence/NormalPageTitle.svelte";
	import { mediaCardVariants } from "$lib/utils/mediaCardVariants";
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
</script>

<NormalHead title="スライド" description="登壇などで使用したスライドの一覧ページです" />
<NormalPageTitle title="スライド" tag="SLIDES" />

{#each Object.entries(data.data) as [title, slides]}
	<h2 class="genre-title serif">{title}</h2>
	<div class="media-grid vgrid">
		{#each slides as slide, index}
			{@const variant = mediaCardVariants[cardIndexByGenre[title][index] % mediaCardVariants.length]}
			<div class="box vcard {variant.bg} {variant.text}">
				<iframe
					class="frame"
					src={slide.slideIframe}
					title="Speaker Deck Iframe"
					frameborder="0"
					allowfullscreen={false}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				></iframe>
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
</style>
