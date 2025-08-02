<script lang="ts">
import NormalHead from "$lib/components/atom/head/NormalHead.svelte";
import NormalPageTitle from "$lib/components/atom/text/sentence/NormalPageTitle.svelte";
import type { PageData } from "./$types";
export let data: PageData;
</script>

<NormalHead title="経歴" description="うすゆきのこれまで" />
<NormalPageTitle title="経歴" />

{#each Object.entries(data.data) as [title, histories]}
	<div class="mb-20 relative">
		<h2
			class="text-2xl md:text-3xl mx-4 mt-6 bg-white z-10 absolute -top-10 md:-top-12 md:left-52"
		>
			🧃{title}🧃
		</h2>
		<div
			class="flex flex-col justify-center items-center border-4 border-blue rounded-lg px-8 py-4 w-full md:w-2/3 mx-auto"
		>
			{#each histories as history}
				<div class="w-full pt-2 pb-6 border-b-2 last:border-b-0">
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
	</div>
{/each}
