<script lang="ts">
	import NormalHead from '$lib/components/atom/head/NormalHead.svelte';
	import NormalPageTitle from '$lib/components/atom/text/sentence/NormalPageTitle.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<NormalHead title="経歴" slug="/kokosuki" description="うすゆきのこれまで" />
<NormalPageTitle title="経歴" />

{#each Object.entries(data.data) as [title, histories]}
	<h2 class="text-3xl text-center mx-4 mt-6">🧃{title}🧃</h2>
	<div class="flex flex-col justify-center items-center">
		{#each histories as history}
			<div class="w-full md:w-1/2 pb-12">
				<div class="flex">
					<p class="text-pink">
						{history.start_date}
					</p>
					{#if history.end_date}
						<p class="text-pink">
							~ {history.end_date}
						</p>
					{/if}
				</div>
				<h2 class="text-2xl">
					{history.name}
				</h2>
				{history.content}
			</div>
		{/each}
	</div>
{/each}
