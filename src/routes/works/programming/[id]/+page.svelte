<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>
<svelte:head>
    <title>{data.data.name}</title> 
		<meta name="description" content={data.data.summary} />
</svelte:head>
<h1>{data.data.name}</h1>
<p>{data.data.background}</p>
{#each data.data.gallery as image }
	<img src={image} alt={data.data.name} loading="lazy"/>
{/each}
