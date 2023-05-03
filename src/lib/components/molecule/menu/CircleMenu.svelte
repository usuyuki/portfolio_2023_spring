<script lang="ts">
	import { page } from '$app/stores';
	import { blur } from 'svelte/transition';
	import { isCircleMenuOpen, toggleCircleMenu } from '$lib/stores/menus';
	type Link = {
		icon: string;
		name: string;
		path: string;
	};
	const linkList: Link[] = [
		{ icon: '🏡', name: 'home', path: '/' },
		{ icon: '💼', name: 'techStack', path: '/techStack' },
		{ icon: '🔍', name: 'about', path: '/about' },
		{ icon: '💻', name: 'programming', path: '/works/programming' },
		{ icon: '📒', name: 'slides', path: '/works/slides' }
	];
</script>

<div class="fixed right-6 -bottom-7 md:-bottom-7 md:right-8">
	<button
		on:click={toggleCircleMenu}
		class="flex flex-col justify-center items-center w-20 h-20 rounded-3xl duration-500 bg-yellow hover:bg-blue"
	>
		<p class="text-xl">🍽</p>
		<p>Menu</p>
	</button>
	{#if $isCircleMenuOpen}
		<nav transition:blur>
			{#each linkList as link, index}
				<a
					href={link.path}
					aria-current={$page.url.pathname === link.path}
					style="--index: {index};"
				>
					<span class="icon">{link.icon}</span>
					<span>{link.name}</span>
				</a>
			{/each}
		</nav>
	{/if}
</div>

<style>
	.icon {
		margin-bottom: -16px;
	}
	a[aria-current='true'] {
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
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
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: absolute;
		/* 真ん中にする */
		top: -50%;
		left: -50%;
		width: 30px;
		height: 30px;
		background: var(--pink);
		color: var(--black);
		font-size: 1.1rem;
		text-shadow: var(--yellow) 1px 0 5px;
		border-radius: 2rem;
		/* 円形配置 */
		--angle: calc(180deg + (var(--perAngle) * var(--index)));
		--x: calc(cos(var(--angle)) * 150px);
		--y: calc(sin(var(--angle)) * 150px);
		translate: calc(var(--x) - 50%) calc(var(--y) - 50%);
		/* 長方形が中心に向かうようにする */
		/* transform: rotatez(calc(-90deg + (var(--perAngle) * var(--index)))); */
	}
</style>
