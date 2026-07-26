<script lang="ts">
	import NormalHead from "$lib/components/atom/head/NormalHead.svelte";
	import NormalPageTitle from "$lib/components/atom/text/sentence/NormalPageTitle.svelte";
	import { pressEasing } from "$lib/utils/actions/pressEasing";
	import { bgClasses } from "$lib/utils/bgClasses";
	import type { PageData } from "./$types";
	export let data: PageData;
</script>

<NormalHead title="リンク集" description="リンク集ページ" />
<NormalPageTitle title="リンク集" tag="LINKS" />

<div class="sec">
	{#each Object.entries(data.data) as [title, links], groupIndex}
		<div class="chip-group">
			<h2 class="serif">{title}</h2>
			<div class="chip-row">
				{#each links as link}
					<a
						class="box chip tag {bgClasses[groupIndex % bgClasses.length]}"
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
						use:pressEasing>{link.name}</a
					>
				{/each}
			</div>
		</div>
	{/each}
</div>

<style>
	.sec {
		padding: 10px 16px 90px;
		max-width: 900px;
		margin: 0 auto;
	}
	.chip-group {
		margin-bottom: 50px;
		text-align: center;
	}
	.chip-group h2 {
		font-size: 24px;
		margin-bottom: 20px;
	}
	.chip-row {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		justify-content: center;
	}
	.chip {
		padding: 12px 22px;
		border-radius: 999px;
		font-size: 13px;
		box-shadow: 4px 4px 0 var(--black);
	}
	.tag {
		font-family: var(--tag-font);
	}
</style>
