<script lang="ts">
	import NormalHead from "$lib/components/atom/head/NormalHead.svelte";
	import NormalPageTitle from "$lib/components/atom/text/sentence/NormalPageTitle.svelte";
	import { mediaCardVariants } from "$lib/utils/mediaCardVariants";
	import type { PageData } from "./$types";
	export let data: PageData;
</script>

<NormalHead title="映像作品" description="映像作品のページです" />
<NormalPageTitle title="映像作品" tag="VIDEO" />

<div class="media-grid vgrid">
	{#each data.data as videos, index}
		{@const variant = mediaCardVariants[index % mediaCardVariants.length]}
		<div class="box vcard {variant.bg} {variant.text}">
			<iframe
				class="frame"
				src={videos.youtubeIframe}
				title="YouTube video player"
				frameborder="0"
				allowfullscreen={true}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			></iframe>
			<div class="body">
				<span class="tag date">{videos.publishedAt}</span>
				<h2 class="serif">{videos.name}</h2>
				<p>{videos.description}</p>
			</div>
		</div>
	{/each}
</div>

<style>
	.vgrid {
		margin: 0 auto 90px;
	}
</style>
