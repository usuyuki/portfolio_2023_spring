<script lang="ts">
	import ArticleTimeline from '$lib/components/molecule/works/programming/ArticleTimeline.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<slot />

<div class="relative border-2 border-blue border-dashed	rounded-xl mb-4">
	<div class="flex justify-center absolute inset-x-0 -top-6">
		<h4 class="text-center text-2xl font-serif bg-white px-4 rounded">つくったもの！</h4>
	</div>
	<ArticleTimeline works={data.data} />
</div>
