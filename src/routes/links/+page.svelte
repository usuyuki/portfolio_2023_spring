<script lang="ts">
	import NormalHead from "$lib/components/atom/head/NormalHead.svelte";
	import NormalPageTitle from "$lib/components/atom/text/sentence/NormalPageTitle.svelte";
	import type { PageData } from "./$types";
	export let data: PageData;
</script>

<NormalHead title="リンク集" description="リンク集ページ" />
<NormalPageTitle title="リンク集" />

{#each Object.entries(data.data) as [title, links]}
	<h2 class="text-3xl text-center mx-4 mt-6">{title}</h2>
	<div class="flex justify-center items-center flex-wrap">
		{#each links as link}
			<a
				class="text-xl mx-4 my-2 techStackName hover:text-blue duration-500"
				href={link.url}
				target="_blank"
				rel="noopener noreferrer">{link.name}</a
			>
		{/each}
	</div>
{/each}
