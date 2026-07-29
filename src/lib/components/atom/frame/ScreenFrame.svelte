<script lang="ts">
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import { pressEasing } from "$lib/utils/actions/pressEasing";
	import { bgClasses } from "$lib/utils/bgClasses";

	type Link = {
		name: string;
		path: string;
	};
	const linkList: Link[] = [
		{ name: "HOME", path: "/" },
		{ name: "ABOUT", path: "/about" },
		{ name: "STACK", path: "/techStack" },
		{ name: "WORKS", path: "/works/programming" },
		{ name: "VIDEO", path: "/works/videos" },
		{ name: "SLIDES", path: "/works/slides" },
	];

	let headerEl: HTMLElement;
	let titleEl: HTMLElement;
	let navEl: HTMLElement;
	// タイトルとナビが1行に収まらず折り返された(2段組みになった)かどうか。
	// flex-wrapの折り返し発生はCSSだけでは検知できないため、実際の高さを見て判定する
	let wrapped = false;

	const checkWrapped = () => {
		if (!headerEl || !titleEl || !navEl) return;
		wrapped = navEl.offsetTop > titleEl.offsetTop;
	};

	onMount(() => {
		checkWrapped();
		const observer = new ResizeObserver(checkWrapped);
		observer.observe(headerEl);
		return () => observer.disconnect();
	});
</script>

<!-- RPGのHUDウィンドウを模した、画面上部に張り付くナビゲーションバー -->
<header
	bind:this={headerEl}
	class="box hud sticky top-3.5 z-50 mx-4 mt-3.5 flex flex-wrap items-center gap-3 px-4 py-2.5"
	class:justify-between={!wrapped}
	class:justify-center={wrapped}
	class:text-center={wrapped}
>
	<a
		bind:this={titleEl}
		href="/"
		use:pressEasing
		class="serif shrink-0 text-sm tracking-wide md:text-base"
	>
		うすゆきどっとねっと
	</a>
	<!-- PCは折り返し表示のまま、スマホ幅(860px以下)だけ2段になって表示領域を圧迫しないよう横スクロールのカルーセルにする -->
	<nav
		bind:this={navEl}
		class="nav-carousel flex flex-wrap gap-2"
		class:justify-center={wrapped}
	>
		{#each linkList as link, index}
			<a
				href={link.path}
				use:pressEasing
				aria-current={$page.url.pathname === link.path}
				class="tab tag shrink-0 {bgClasses[index % bgClasses.length]}"
			>
				{link.name}
			</a>
		{/each}
	</nav>
</header>

<style>
	.tag {
		font-family: var(--tag-font);
	}
	.tab {
		position: relative;
		font-size: 11px;
		letter-spacing: 0.5px;
		padding: 8px 14px;
		border-radius: 999px;
		border: 3px solid var(--black);
		overflow: hidden;
	}
	/* 現在地のタブは枠で囲むのではなく、発光+斜めのシャインが走る光沢で示す。
	   タブごとに背景色(pink/blue/yellow)が異なるため、グローは色を持たない白系にして背景色と衝突させない */
	.tab[aria-current='true'] {
		box-shadow:
			0 0 0 1px var(--white),
			0 0 10px 3px rgba(255, 255, 255, 0.9);
	}
	.tab[aria-current='true']::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(
			115deg,
			transparent 30%,
			rgba(255, 255, 255, 0.85) 48%,
			rgba(255, 255, 255, 0.85) 52%,
			transparent 70%
		);
		background-size: 250% 100%;
		background-position: 130% 0;
		animation: tab-shine 2.4s ease-in-out infinite;
		pointer-events: none;
	}
	@keyframes tab-shine {
		0%,
		20% {
			background-position: 130% 0;
		}
		80%,
		100% {
			background-position: -30% 0;
		}
	}
	@media (max-width: 767px) {
		/* スマホ幅ではタイトルとカルーセルが縦に2段積みになるため、タイトルは中央揃えにする */
		header {
			justify-content: center;
			text-align: center;
		}
		/* スマホ幅では折り返して2段になると表示領域を圧迫するため、横スクロールのカルーセルにする */
		.nav-carousel {
			flex-wrap: nowrap;
			width: 100%;
			justify-content: flex-start;
			overflow-x: auto;
			scrollbar-width: thin;
			-webkit-overflow-scrolling: touch;
			padding-bottom: 2px;
			/* 左端(HOME)は常に全体を見せたいので、フェードは右端(スクロール可能であることの示唆)だけに付ける */
			mask-image: linear-gradient(to right, black calc(100% - 12px), transparent);
		}
	}
</style>
