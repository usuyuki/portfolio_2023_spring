<script lang="ts">
	import NormalHead from "$lib/components/atom/head/NormalHead.svelte";
	import NormalPageTitle from "$lib/components/atom/text/sentence/NormalPageTitle.svelte";
	import type { PageData } from "./$types";
	export let data: PageData;
</script>

<NormalHead title="経歴" description="うすゆきのこれまで" />
<NormalPageTitle title="経歴" tag="HISTORY" />

<div class="sec">
	{#each Object.entries(data.data) as [title, histories], i}
		<div class="chapter">
			<span id={`history-${i}`} class="chap-title serif">🧃{title}🧃</span>
			<div class="timeline">
				{#each histories as history}
					<div class="box tl-card">
						<span class="tag tl-date">
							{history.start_date}{#if history.end_date}
								~ {history.end_date}{/if}
						</span>
						<h3 class="serif">{history.name}</h3>
						<p>{history.content}</p>
					</div>
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
	.chapter {
		margin-bottom: 70px;
	}
	.chap-title {
		display: inline-block;
		font-size: 22px;
		background: var(--yellow);
		border: 4px solid var(--black);
		border-radius: 999px;
		padding: 8px 24px;
		margin-bottom: 24px;
		box-shadow: 5px 5px 0 var(--black);
		scroll-margin-top: 100px;
	}
	.timeline {
		border-left: 5px dashed var(--black);
		padding-left: 30px;
		display: flex;
		flex-direction: column;
		gap: 22px;
	}
	.tl-card {
		padding: 18px 22px;
	}
	.tag.tl-date {
		font-family: var(--tag-font);
		font-size: 12px;
		color: var(--pink);
		background: var(--black);
		display: inline-block;
		padding: 3px 10px;
		border-radius: 999px;
	}
	.tl-card h3 {
		font-size: 19px;
		margin: 10px 0 6px;
	}
	.tl-card p {
		font-size: 14px;
		margin: 0;
	}
</style>
