<script lang="ts">
	import { page } from '$app/stores';
	type Link = {
		name: string;
		path: string;
	};
	const linkList: Link[] = [
		{ name: 'home', path: '/' },
		{ name: 'techStack', path: '/techStack' },
		{ name: 'about', path: '/about' },
		{ name: 'programming', path: '/works/programming' },
		{ name: 'slides', path: '/works/slides' }
	];
</script>

<div class="fixed right-6 -bottom-7 md:-bottom-7 md:right-8">
	<div class="flex justify-center items-center w-20 h-20 rounded-3xl bg-blue">
		<p>めにゅー</p>
	</div>
	<nav>
		{#each linkList as link, index}
			<a
				href={link.path}
				aria-current={$page.url.pathname === link.path}
				style="--index: {index};"
			>
				<span>{link.name}</span>
			</a>
		{/each}
	</nav>
</div>

<style>
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
	div div {
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
		justify-content: center;
		align-items: center;
		position: absolute;
		/* 真ん中にする */
		top: -50%;
		left: -50%;
		width: 20px;
		height: 20px;
		background: var(--pink);
		color: var(--black);
		font-size: 1rem;
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
