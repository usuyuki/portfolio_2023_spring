<script lang="ts">
	import { page } from "$app/stores";
	import { pressEasing } from "$lib/utils/actions/pressEasing";

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
	const bgClasses = ["bg-yellow", "bg-pink", "bg-blue"];
</script>

<!-- RPGのHUDウィンドウを模した、画面上部に張り付くナビゲーションバー -->
<header class="box hud sticky top-3.5 z-50 mx-4 mt-3.5 flex flex-wrap items-center justify-between gap-3 px-4 py-2.5">
	<a href="/" use:pressEasing class="serif text-sm tracking-wide md:text-base">うすゆきどっとねっと</a>
	<nav class="flex flex-wrap gap-2">
		{#each linkList as link, index}
			<a
				href={link.path}
				use:pressEasing
				aria-current={$page.url.pathname === link.path}
				class="tab tag {bgClasses[index % bgClasses.length]}"
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
		font-size: 11px;
		letter-spacing: 0.5px;
		padding: 8px 14px;
		border-radius: 999px;
		border: 3px solid var(--black);
	}
	.tab[aria-current='true'] {
		outline: 3px solid var(--black);
		outline-offset: 2px;
	}
	@media (max-width: 860px) {
		header {
			justify-content: center;
			text-align: center;
		}
		nav {
			justify-content: center;
			width: 100%;
		}
	}
</style>
