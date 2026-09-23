<script lang="ts">
	// 中身は自由に書いてよい。一覧に出す情報は src/lib/data/events.ts 側
	import NormalHead from "$lib/components/atom/head/NormalHead.svelte";
	import NormalPageTitle from "$lib/components/atom/text/sentence/NormalPageTitle.svelte";
	import { pressEasing } from "$lib/utils/actions/pressEasing";
	import { bgClasses } from "$lib/utils/bgClasses";

	const info = [
		{ emoji: "📅", label: "会期", value: "2026/11/21 〜 2026/12/06" },
		{ emoji: "🏢", label: "オフライン開催日", value: "2026/11/23" },
		{ emoji: "🎪", label: "サークル名", value: "うすゆきスタジオ" },
	];

	// オンライン/オフラインの2会場があるので情報タグとは分けて並記する
	const venues = [
		{
			emoji: "💻",
			label: "オンライン",
			name: "技術書典オンラインマーケット",
			link: "https://techbookfest.org/market",
			bg: "bg-blue",
		},
		{
			emoji: "📍",
			label: "オフライン",
			name: "池袋・サンシャインシティ 展示ホールD（文化会館ビル2F）",
			link: null,
			bg: "bg-yellow",
		},
	];

	// 頒布物が決まったらここに足す。genreは本/グッズなどの種別
	const items = [
		{
			genre: "本",
			name: "がんばるスマートホーム(仮称)",
			price: "500円(仮)",
			description: "",
		},
	];
</script>

<NormalHead title="技術書典21" description="技術書典21の参加情報とお品書き" />
<NormalPageTitle title="技術書典21" tag="EVENT" />

<p class="text-center text-xl mt-4 mb-10">
	技術書典21に<br class="md:hidden" />「うすゆきスタジオ」で参加します。
</p>

<section class="sec">
	<div class="flex justify-center flex-wrap gap-3">
		{#each info as item}
			<span class="box-tag info-tag">{item.emoji} {item.label}: {item.value}</span>
		{/each}
	</div>
</section>

<section class="sec">
	<div class="sec-head">
		<h2 class="serif">会場</h2>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
		{#each venues as venue}
			<div class="box venue-box {venue.bg}">
				<span class="tag venue-label">{venue.emoji} {venue.label}</span>
				<p class="venue-name">{venue.name}</p>
				{#if venue.link !== null}
					<a
						href={venue.link}
						target="_blank"
						rel="noopener noreferrer"
						use:pressEasing
						class="btn-rpg small bg-white mt-3">マーケットへ🔗</a
					>
				{/if}
			</div>
		{/each}
	</div>
</section>

<section class="sec">
	<div class="sec-head">
		<h2 class="serif">お品書き</h2>
	</div>
	{#if items.length > 0}
		<div class="items-grid">
			{#each items as item, index}
				<div class="box item-box {bgClasses[index % bgClasses.length]}">
					<span class="tag genre">{item.genre}</span>
					<h3 class="serif">{item.name}</h3>
					<span class="tag price">{item.price}</span>
					{#if item.description !== ""}
						<p class="mt-2">{item.description}</p>
					{/if}
				</div>
			{/each}
		</div>
	{:else}
		<p class="text-center text-2xl">じゅんびちゅう</p>
	{/if}
</section>

<div class="flex justify-center mb-16">
	<a href="/events" use:pressEasing class="box btn-rpg bg-yellow">イベント一覧へ</a>
</div>

<style>
	.sec {
		padding: 0 16px 50px;
		max-width: 1000px;
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
	.info-tag {
		font-family: var(--tag-font);
		font-size: 12px;
	}
	.venue-box {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 24px;
	}
	.tag.venue-label {
		font-family: var(--tag-font);
		font-size: 12px;
		color: var(--pink);
		background: var(--black);
		display: inline-block;
		padding: 3px 10px;
		border-radius: 999px;
	}
	.venue-name {
		font-size: 15px;
		margin: 10px 0 0;
	}
	/* 1点のときにカードが横長に伸びないよう幅の上限を決めて中央に寄せる */
	.items-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 300px));
		gap: 24px;
		justify-content: center;
	}
	.item-box {
		padding: 24px;
	}
	/* 金額タグ(塗り)と役割が違うので枠線にして見分けられるようにする */
	.tag.genre {
		font-family: var(--tag-font);
		font-size: 11px;
		display: inline-block;
		padding: 2px 10px;
		border: 2px solid var(--black);
		border-radius: 999px;
		background: var(--white);
	}
	.item-box h3 {
		font-size: 18px;
		margin: 8px 0 0;
	}
	.tag.price {
		font-family: var(--tag-font);
		font-size: 12px;
		color: var(--pink);
		background: var(--black);
		display: inline-block;
		padding: 3px 10px;
		border-radius: 999px;
		margin-top: 8px;
	}
	.item-box p {
		font-size: 14px;
		margin: 0;
	}
</style>
