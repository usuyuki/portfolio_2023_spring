<script lang="ts">
	import NormalHead from "$lib/components/atom/head/NormalHead.svelte";
	import NormalPageTitle from "$lib/components/atom/text/sentence/NormalPageTitle.svelte";
	import type { PageData } from "./$types";
	export let data: PageData;
</script>

<NormalHead title="技術スタック" description="シェフのきまぐれ技術スタック" />
<NormalPageTitle title="技術スタック" tag="STACK" />

<div class="sec">
	{#each Object.entries(data.data) as [genreTitle, techStacks]}
		<div class="skill-group">
			<h2 class="serif">「{genreTitle}」</h2>
			{#each techStacks as techStack}
				<div class="skill-row">
					<span class="skill-name">{techStack.name}</span>
					<div class="skill-bar">
						<div class="skill-fill" style="--power:{techStack.power}"></div>
					</div>
					<span class="skill-note tag">{techStack.power}</span>
				</div>
				{#if techStack.content}
					<p class="skill-content">{techStack.content}</p>
				{/if}
			{/each}
		</div>
	{/each}
</div>

<style>
	.sec {
		padding: 20px 16px 90px;
		max-width: 900px;
		margin: 0 auto;
	}
	.skill-group {
		margin-bottom: 56px;
	}
	.skill-group h2 {
		font-size: 26px;
		margin-bottom: 20px;
	}
	.skill-row {
		display: flex;
		align-items: center;
		gap: 16px;
		margin-bottom: 6px;
	}
	.skill-name {
		flex: 0 0 140px;
		font-weight: bold;
		font-size: 15px;
	}
	.skill-bar {
		flex: 1;
		height: 22px;
		background: var(--ui-bg);
		border: 3px solid var(--black);
		border-radius: 999px;
		overflow: hidden;
	}
	.skill-fill {
		height: 100%;
		border-radius: 999px;
		transform-origin: left;
		transform: scaleX(0);
		background: var(--blue);
		animation: fillBar 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
	}
	@keyframes fillBar {
		to {
			transform: scaleX(calc(var(--power) / 100));
		}
	}
	.skill-row:nth-child(3n + 1) .skill-fill {
		background: var(--pink);
	}
	.skill-row:nth-child(3n + 2) .skill-fill {
		background: var(--blue);
	}
	.skill-row:nth-child(3n) .skill-fill {
		background: var(--yellow);
	}
	.skill-note {
		flex: 0 0 auto;
		font-family: var(--tag-font);
		font-size: 11px;
		opacity: 0.6;
		width: 30px;
		text-align: right;
	}
	.skill-content {
		font-size: 13px;
		margin: 0 0 18px 156px;
		opacity: 0.8;
	}
	@media (max-width: 640px) {
		.skill-name {
			flex-basis: 90px;
			font-size: 13px;
		}
		.skill-content {
			margin-left: 0;
		}
	}
</style>
