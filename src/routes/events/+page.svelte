<script lang="ts">
	import NormalHead from "$lib/components/atom/head/NormalHead.svelte";
	import NormalPageTitle from "$lib/components/atom/text/sentence/NormalPageTitle.svelte";
	import { pressEasing } from "$lib/utils/actions/pressEasing";
	import { bgClasses } from "$lib/utils/bgClasses";
	import { formatEventPeriod } from "$lib/utils/formatEventPeriod";
	import type { PageData } from "./$types";
	export let data: PageData;

	// 再計算するとSSR時と結果がずれうるので+page.server.tsの結果をそのまま使う
	const { hero, upcoming, past } = data;
</script>

<NormalHead title="イベント" description="うすゆきが参加するコミケ・技術書典などのイベント情報" />
<NormalPageTitle title="イベント" tag="EVENTS" />

<p class="text-center text-xl mt-4 mb-10">
	コミケや技術書典など、<br class="md:hidden" />参加するイベントのページです。
</p>

{#if hero !== null}
	<section class="sec">
		<a class="hero-link" href="/events/{hero.slug}" use:pressEasing>
			<div class="box hero-card bg-pink">
				{#if hero.thumbnail !== null}
					<img loading="lazy" src={hero.thumbnail} alt="{hero.name}のサムネイル" class="hero-thumb" />
				{:else}
					<div class="hero-thumb hero-thumb-placeholder" aria-hidden="true">
						<span class="serif">EVENT</span>
					</div>
				{/if}
				<div class="hero-body">
					<span class="box-tag">PICK UP</span>
					<h2 class="serif">{hero.name}</h2>
					<p class="tag hero-date">{formatEventPeriod(hero.startDate, hero.endDate)}</p>
				</div>
			</div>
		</a>
	</section>
{:else}
	<p class="text-center text-2xl">じゅんびちゅう</p>
	<div class="w-full h-screen bg-ui-bg"></div>
{/if}

{#each [{ title: "これから", tag: "UPCOMING", list: upcoming }, { title: "これまで", tag: "PAST", list: past }] as section}
	<!-- 該当するイベントが無いセクションは枠ごと出さない -->
	{#if section.list.length > 0}
		<section class="sec">
			<div class="sec-head">
				<span class="box-tag">{section.tag}</span>
				<h2 class="serif">{section.title}</h2>
			</div>
			<div class="media-grid events-grid">
				{#each section.list as event, index}
					<a class="event-card-link" href="/events/{event.slug}" use:pressEasing>
						<div class="box vcard {bgClasses[index % bgClasses.length]}">
							{#if event.thumbnail !== null}
								<img
									loading="lazy"
									src={event.thumbnail}
									alt="{event.name}のサムネイル"
									class="frame object-cover"
								/>
							{:else}
								<div class="frame thumb-placeholder" aria-hidden="true">
									<span class="serif">EVENT</span>
								</div>
							{/if}
							<div class="body">
								<span class="tag date">{formatEventPeriod(event.startDate, event.endDate)}</span>
								<h2 class="serif">{event.name}</h2>
							</div>
						</div>
					</a>
				{/each}
			</div>
		</section>
	{/if}
{/each}

<style>
	.sec {
		padding: 0 4px 60px;
		max-width: 1200px;
		margin: 0 auto;
	}
	.sec-head {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		margin-bottom: 30px;
	}
	.sec-head h2 {
		font-size: clamp(24px, 4vw, 40px);
		margin: 0;
	}
	/* pressEasingのscale分が隣のカードにかぶらないようクリップする */
	.hero-link,
	.event-card-link {
		display: block;
		overflow: hidden;
		border-radius: 22px;
	}
	.hero-link {
		max-width: 900px;
		margin: 0 auto;
	}
	.hero-card {
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	.hero-thumb {
		width: 100%;
		aspect-ratio: 16 / 9;
		/* 16:9のままだと画像だけで1画面を占め、タイトルが折り返し位置より下に隠れる */
		max-height: 45vh;
		object-fit: cover;
		display: block;
		border-bottom: var(--box-border) solid var(--black);
	}
	.hero-body {
		padding: 24px;
		text-align: center;
	}
	.hero-body h2 {
		font-size: clamp(24px, 5vw, 44px);
		margin: 14px 0 8px;
	}
	.tag.hero-date {
		font-family: var(--tag-font);
		font-size: 14px;
		margin: 0;
	}
	/* 画像枠と同じ比率を保って高さの崩れを防ぐ */
	.hero-thumb-placeholder,
	.thumb-placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		background: repeating-linear-gradient(
			45deg,
			var(--white),
			var(--white) 12px,
			var(--ui-bg, #eee) 12px,
			var(--ui-bg, #eee) 24px
		);
	}
	.hero-thumb-placeholder span,
	.thumb-placeholder span {
		font-size: clamp(20px, 4vw, 36px);
		opacity: 0.35;
		letter-spacing: 4px;
	}
	.events-grid {
		margin: 0 auto;
		grid-template-columns: repeat(3, 1fr);
	}
	.events-grid .vcard {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.events-grid .body h2 {
		margin: 8px 0 0;
	}
	@media (max-width: 1100px) {
		.events-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (max-width: 860px) {
		/* app.cssの.media-gridが860pxで1カラムにするのを、3→2→1の段階縮小にするため上書き */
		.events-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (max-width: 560px) {
		.events-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
