<script lang="ts">
	import ArticleTimeline from "$lib/components/molecule/works/programming/ArticleTimeline.svelte";
	import type { PageData } from "./$types";
	export let data: PageData;
</script>

<slot />

<div class="relative mb-4 rounded-xl border-2 border-dashed border-blue">
	<div class="flex absolute inset-x-0 -top-6 justify-center">
		<h4 class="px-4 font-serif text-2xl text-center bg-white rounded">つくったもの！</h4>
	</div>
	<ArticleTimeline works={data.data} />
</div>
