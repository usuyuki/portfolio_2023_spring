<script lang="ts">
	export let title: string;
	export let tag: string = title;
</script>

<div class="page-title">
	<span class="box-tag">{tag}</span>
	<h1 class="hero-title-page">{title}</h1>
</div>

<style>
	.page-title {
		padding: 70px 20px 10px;
		max-width: 1200px;
		margin: 0 auto 40px;
		text-align: center;
		animation: fadeUp 0.5s;
		animation-fill-mode: forwards;
		opacity: 0;
	}
	.hero-title-page {
		font-family: var(--heading-font);
		font-size: clamp(40px, 9vw, 110px);
		margin: 14px 0 0;
		-webkit-text-stroke: 2px var(--black);
		color: var(--white);
		/* 影のオフセットをフォントサイズに比例させる。固定pxだとスマホで文字が縮んだ時に
		   影が相対的に大きくなりすぎて文字と重なり、可読性が落ちるため */
		text-shadow:
			0.05em 0.05em 0 var(--pink),
			0.1em 0.1em 0 var(--black);
	}

	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(50px);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
