<script lang="ts">
	import { fly } from "svelte/transition";
	import { page } from "$app/stores";
	import { isCircleMenuOpen, toggleCircleMenu } from "$lib/stores/menus";
	import { pressEasing } from "$lib/utils/actions/pressEasing";

	type Link = {
		icon: string;
		name: string;
		path: string;
	};
	const linkList: Link[] = [
		{ icon: "🏡", name: "home", path: "/" },
		{ icon: "💼", name: "techStack", path: "/techStack" },
		{ icon: "🔍", name: "about", path: "/about" },
		{ icon: "💻", name: "programming", path: "/works/programming" },
		{ icon: "📒", name: "slides", path: "/works/slides" },
	];
</script>

<div class="fixed right-6 -bottom-7 z-40 md:-bottom-7 md:right-8">
	<button
		on:click={toggleCircleMenu}
		use:pressEasing
		class="flex flex-col justify-center items-center w-20 h-20 rounded-3xl duration-500 bg-yellow hover:bg-blue"
	>
		<p class="text-xl">🍽</p>
		<p>Menu</p>
	</button>
	{#if $isCircleMenuOpen}
		<nav out:fly|global={{ x: -300, y: -300, duration: 500 }}>
			{#each linkList as link, index}
				<a
					href={link.path}
					aria-current={$page.url.pathname === link.path}
					style="--index: {index};"
				>
					<span class="menu-item-inner" use:pressEasing>
						<span class="icon">{link.icon}</span>
						<span>{link.name}</span>
					</span>
				</a>
			{/each}
		</nav>
	{/if}
</div>

<style>
	.icon {
		margin-bottom: -16px;
	}
	a[aria-current='true'] .menu-item-inner {
		background: var(--blue);
	}
	div {
		/* 1つあたりに割り当てられる角度の計算 */
		--numberOfElement: 5;
		--range: 90deg;
		/* 4倍することで90度領域だけをきれいに使う */
		--perAngle: calc(var(--range) / var(--numberOfElement));
	}
	button {
		clip-path: polygon(
			50% 0%,
			83% 12%,
			100% 43%,
			94% 78%,
			68% 100%,
			32% 100%,
			6% 78%,
			0% 43%,
			17% 12%
		);
	}
	nav {
		height: 60px;
		width: 60px;
		position: relative;
		left: 140%;
	}
	nav a {
		position: absolute;
		/* 真ん中にする */
		top: -50%;
		left: -50%;
		width: 30px;
		height: 30px;
		border-radius: 2rem;
		/* 円形配置 */
		--angle: calc(180deg + (var(--perAngle) * var(--index)));
		--x: calc(cos(var(--angle)) * 150px);
		--y: calc(sin(var(--angle)) * 150px);
		translate: calc(var(--x) - 50%) calc(var(--y) - 50%);

		animation: spread 0.5s;
		animation-delay: calc(var(--index) * 100ms);
		animation-fill-mode: both;
	}

	/* GSAPがscale等のtransform系プロパティをインラインstyleに書き込むため、
	   親<a>のtranslateによる円形配置と競合しないよう拡縮アニメーションはこの内側要素に閉じ込める */
	.menu-item-inner {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		background: var(--pink);
		color: var(--black);
		font-size: 1.1rem;
		text-shadow: var(--yellow) 1px 0 5px;
		border-radius: 2rem;
	}

	@keyframes spread {
		from {
			opacity: 0;
			translate: -50% -50%;
		}

		to {
			opacity: 1;
			translate: calc(var(--x) - 50%) calc(var(--y) - 50%);
		}
	}
</style>
