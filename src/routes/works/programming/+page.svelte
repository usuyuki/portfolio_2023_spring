<script lang="ts">
	import NormalHead from "$lib/components/atom/head/NormalHead.svelte";
	import NormalPageTitle from "$lib/components/atom/text/sentence/NormalPageTitle.svelte";
	import { pressEasing } from "$lib/utils/actions/pressEasing";
	import { mediaCardVariants } from "$lib/utils/mediaCardVariants";
	import type { PageData } from "./$types";
	export let data: PageData;

	// Notion側の並び順(公開日降順)をそのまま一覧の並び順として使う
	const works = Object.entries(data.allWorks);
</script>

<NormalHead title="プログラミング作品" description="プログラミングで作ったもの" />
<NormalPageTitle title="プログラミング作品" tag="WORKS" />

<p class="text-center text-xl mt-4 mb-10">
	ここはプログラミング関係の<br class="md:hidden" />制作物のページです。
</p>

<div class="box flex justify-center flex-wrap items-center gap-4 mx-auto mb-14 p-6 max-w-4xl bg-white">
	<img
		loading="lazy"
		class="rounded-xl"
		src="https://raw.githubusercontent.com/usuyuki/usuyuki/master/profile-summary-card-output/solarized/3-stats.svg"
		alt="他GitHubの情報"
	/>
	<img
		loading="lazy"
		class="rounded-xl"
		src="https://raw.githubusercontent.com/usuyuki/usuyuki/master/profile-summary-card-output/solarized/2-most-commit-language.svg"
		alt="コミット言語円グラフ"
	/>
	<img
		loading="lazy"
		class="rounded-xl"
		src="https://raw.githubusercontent.com/usuyuki/usuyuki/master/profile-summary-card-output/solarized/1-repos-per-language.svg"
		alt="リポジトリ言語円グラフ"
	/>
</div>

<div class="media-grid works-grid">
	{#each works as [id, work], index}
		{@const variant = mediaCardVariants[index % mediaCardVariants.length]}
		<a class="work-card-link" href="/works/programming/{id}" use:pressEasing>
			<div class="box vcard {variant.bg} {variant.text}">
				<img
					loading="lazy"
					alt="サムネイル"
					src={work.thumbnail}
					class="frame aspect-video w-full object-cover"
				/>
				<div class="body">
					<span class="tag date">{work.publishedAt}</span>
					<div class="flex items-center gap-2 mt-1">
						{#if work.logo !== false}
							<img loading="lazy" src={work.logo} class="w-7 h-7 object-contain shrink-0" alt="ロゴ" />
						{/if}
						<h2 class="serif">{work.name}</h2>
					</div>
					<p>{work.summary}</p>
				</div>
			</div>
		</a>
	{/each}
</div>

<style>
	.works-grid {
		margin: 0 auto 60px;
		grid-template-columns: repeat(4, 1fr);
	}
	/* pressEasingがこの要素をscaleさせるため、拡大分が隣のカードや自分のテキストにかぶらないようクリップする */
	.work-card-link {
		display: block;
		overflow: hidden;
		border-radius: 22px;
	}
	.works-grid .vcard {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.works-grid .body {
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.works-grid .body h2 {
		margin: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		/* flexアイテムはmin-width:autoが既定でellipsisが効かないためリセットする */
		min-width: 0;
	}
	.works-grid .body p {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	@media (max-width: 1100px) {
		.works-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	@media (max-width: 860px) {
		/* app.cssの.media-gridも同じ860pxで1カラムに上書きするが、このページは4→3→2カラムの段階的な縮小にしたいため.works-gridで再上書きする */
		.works-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (max-width: 480px) {
		.works-grid {
			gap: 14px;
		}
	}
</style>
