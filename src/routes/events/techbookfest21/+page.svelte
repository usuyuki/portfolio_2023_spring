<script lang="ts">
	// 中身は自由に書いてよい。一覧に出す情報は src/lib/data/events.ts 側
	import NormalHead from "#lib/components/atom/head/NormalHead.svelte";
	import NormalPageTitle from "#lib/components/atom/text/sentence/NormalPageTitle.svelte";
	import { pressEasing } from "#lib/utils/actions/pressEasing.ts";
	import { bgClasses } from "#lib/utils/bgClasses.ts";

	const info = [
		{ emoji: "📅", label: "会期", value: "2026/11/21 〜 2026/12/06" },
		{ emoji: "🎪", label: "サークル名", value: "うすゆきスタジオ" },
	];

	// オンラインとオフラインで開催日が違うので、会場ごとに日付を持たせる
	const venues = [
		{
			emoji: "💻",
			label: "オンライン",
			date: "2026/11/21 〜 2026/12/06",
			name: "技術書典オンラインマーケット",
			link: "https://techbookfest.org/market",
			bg: "bg-blue",
		},
		{
			emoji: "📍",
			label: "オフライン",
			date: "2026/11/23",
			name: "池袋・サンシャインシティ 展示ホールD（文化会館ビル2F） そ16",
			link: "https://maps.app.goo.gl/Jv1TPHVebEDhiPtu5",
			bg: "bg-yellow",
		},
	];

	// 頒布物が決まったらここに足す。genreは本/グッズなどの種別
	// nameの\nは、1行に収まらないときに改行する位置。coverは表紙画像のパス、isdnは同人誌向けのISBNであるISDN。どちらも無い物はnullにする
	// linkは販売ページのURL。まだ無いときはnullにすると「準備中」と出る
	const items = [
		{
			genre: "本",
			name: "「スマートホームを\nもう一歩進める技術」",
			price: "500円",
			description:
				"スマートホームを導入しているお宅が、もっとスマートホームを活用できるようになる本です",
			cover: "/img/events/ISDN278-4-861446-01-3.png",
			isdn: "278-4-861446-01-3",
			link: null as string | null,
		},
	];
</script>

<NormalHead title="技術書典21" description="技術書典21の参加情報とお品書き" />
<NormalPageTitle title="技術書典21" tag="EVENT" />

<p class="text-center text-2xl mt-4 mb-10">
	技術書典21に<br class="md:hidden" />「うすゆきスタジオ」で参加します。
</p>

<section class="sec">
	<div class="flex justify-center flex-wrap gap-3">
		{#each info as item}
			<span class="box-tag info-tag"
				>{item.emoji} {item.label}: {item.value}</span
			>
		{/each}
	</div>
</section>

<section class="sec sec-wide">
	<div class="sec-head">
		<h2 class="serif">お品書き</h2>
	</div>
	{#if items.length > 0}
		<div class="items-grid">
			{#each items as item, index}
				<div
					class="box item-box {bgClasses[index % bgClasses.length]}"
					class:has-cover={item.cover !== null}
				>
					{#if item.cover !== null}
						<img
							loading="lazy"
							src={item.cover}
							alt="{item.name.replaceAll('\n', '')}の表紙"
							class="item-cover"
						/>
					{/if}
					<span class="tag genre">{item.genre}</span>
					<h3 class="serif">
						{#each item.name.split("\n") as line}
							<span class="title-line">{line}</span>
						{/each}
					</h3>
					{#if item.description !== ""}
						<p class="description">{item.description}</p>
					{/if}
					<div class="buy">
						<span class="tag price">{item.price}</span>
						{#if item.link !== null}
							<a
								href={item.link}
								target="_blank"
								rel="noopener noreferrer"
								use:pressEasing
								class="btn-rpg small bg-yellow">販売ページへ</a
							>
						{:else}
							<span class="btn-rpg small buy-pending">販売ページ準備中</span>
						{/if}
					</div>
					{#if item.isdn !== null}
						<p class="isdn">ISDN {item.isdn}</p>
					{/if}
				</div>
			{/each}
		</div>
	{:else}
		<p class="text-center text-2xl">じゅんびちゅう</p>
	{/if}
</section>

<section class="sec">
	<div class="sec-head">
		<h2 class="serif">会場</h2>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
		{#each venues as venue}
			<div class="box venue-box {venue.bg}">
				<span class="tag venue-label">{venue.emoji} {venue.label}</span>
				<p class="venue-date">{venue.date}</p>
				<a
					href={venue.link}
					target="_blank"
					rel="noopener noreferrer"
					class="venue-name venue-link">{venue.name}</a
				>
			</div>
		{/each}
	</div>
</section>

<div class="flex justify-center mb-16">
	<a href="/events" use:pressEasing class="box btn-rpg bg-yellow"
		>イベント一覧へ</a
	>
</div>

<style>
	.sec {
		padding: 0 16px 50px;
		max-width: 1000px;
		margin: 0 auto;
	}
	/* お品書きはPCでタイトルを1行で出せるよう、他のセクションより広くとる */
	.sec.sec-wide {
		max-width: 1240px;
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
		font-size: 15px;
		padding: 8px 18px;
	}
	.venue-box {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 24px;
	}
	.tag.venue-label {
		font-family: var(--tag-font);
		font-size: 14px;
		color: var(--pink);
		background: var(--black);
		display: inline-block;
		padding: 3px 10px;
		border-radius: 999px;
	}
	.venue-date {
		font-family: var(--tag-font);
		font-size: 16px;
		margin: 12px 0 0;
	}
	.venue-name {
		font-size: 18px;
		margin: 6px 0 0;
	}
	/* ボタンをやめた分、リンクであることが見た目で分かるよう下線を引く */
	.venue-link {
		display: inline-block;
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	/* カードは中身に合わせた幅にして中央に寄せる */
	.items-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 32px;
		justify-content: center;
	}
	/* スマホは画面幅いっぱい、PCはタイトルが折り返さない幅(fit-content)にする */
	.item-box {
		padding: 36px;
		width: 100%;
	}
	@media (min-width: 768px) {
		.item-box {
			width: fit-content;
			max-width: 100%;
		}
	}
	/* 金額タグ(塗り)と役割が違うので枠線にして見分けられるようにする */
	.tag.genre {
		font-family: var(--tag-font);
		font-size: 20px;
		display: inline-block;
		padding: 6px 18px;
		border: 2px solid var(--black);
		border-radius: 999px;
		background: var(--white);
	}
	.item-box h3 {
		/* スマホ幅で「スマートホームを」が1行に収まる大きさ。PCはメディアクエリで32px */
		font-size: 24px;
		margin: 20px 0 0;
	}
	/* 区切りごとにinline-blockにして、1行に収まらないときだけnameの\nの位置で折り返す */
	.title-line {
		display: inline-block;
	}
	.tag.price {
		font-family: var(--tag-font);
		font-size: 22px;
		color: var(--pink);
		background: var(--black);
		display: inline-block;
		padding: 4px 15px;
		border-radius: 999px;
	}
	/* 値段と販売リンクを横に並べる。幅が足りなければ折り返す */
	.buy {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 16px;
		margin-top: 28px;
	}
	/* 押せないことが分かるよう、影を消して薄くする */
	.buy-pending {
		background: var(--white);
		box-shadow: none;
		opacity: 0.6;
		cursor: default;
	}
	/* 表紙はA5縦長なので比率を保ったままカード幅いっぱいに出す */
	.item-cover {
		display: block;
		width: 100%;
		height: auto;
		border: 2px solid var(--black);
		margin-bottom: 28px;
	}
	/* PCでは表紙を左、本の情報を右に並べ、ISDNは表紙の下に置く。スマホは縦に積む */
	@media (min-width: 768px) {
		.item-box.has-cover {
			display: grid;
			grid-template-columns: 300px auto;
			/* 空き行(1fr)を説明と値段の間に入れて、値段を表紙の下端にそろえる */
			grid-template-rows: auto auto auto 1fr auto auto;
			grid-template-areas:
				"cover genre"
				"cover title"
				"cover description"
				"cover ."
				"cover price"
				"isdn .";
			column-gap: 48px;
			align-items: start;
		}
		.item-box.has-cover .item-cover {
			grid-area: cover;
			margin-bottom: 0;
		}
		.item-box.has-cover .genre {
			grid-area: genre;
			justify-self: start;
		}
		.item-box.has-cover h3 {
			grid-area: title;
		}
		.item-box h3 {
			font-size: 32px;
		}
		.item-box.has-cover .buy {
			grid-area: price;
			justify-self: start;
			align-self: end;
		}
		.item-box.has-cover .description {
			grid-area: description;
		}
		.item-box.has-cover .isdn {
			grid-area: isdn;
		}
	}
	.item-box p.isdn {
		font-family: var(--tag-font);
		font-size: 14px;
		margin-top: 16px;
	}
	/* タイトルより大きくならないよう、スマホでは18px、PCでは24px */
	.item-box p.description {
		/* 説明文の長さでカードが広がらないよう、幅はタイトル側に合わせて折り返させる */
		contain: inline-size;
		font-size: 18px;
		line-height: 1.7;
		margin-top: 24px;
	}
	/* 上の基本ルールより後ろに書かないと18pxで上書きされるので、ここに置く */
	@media (min-width: 768px) {
		.item-box p.description {
			font-size: 24px;
		}
	}
	.item-box p {
		font-size: 16px;
		margin: 0;
	}
</style>
