<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="flex justify-center flex-wrap">
	{#each data.data as works}
		<div class="mx-4 my-2">
			<h2 class="text-2xl">{works.name}</h2>
			<p class="text-xl">{works.summary}</p>
		</div>
	{/each}
</div>
