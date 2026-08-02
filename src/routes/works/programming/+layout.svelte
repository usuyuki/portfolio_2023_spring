<script lang="ts">
	import ArticleTimeline from "$lib/components/molecule/works/programming/ArticleTimeline.svelte";
	import type { PageData } from "./$types";
	export let data: PageData;
</script>

<slot />

<div class="box relative mb-4 mt-16 pb-4 bg-ui-bg">
	<div class="flex absolute inset-x-0 -top-6 justify-center">
		<span class="box-tag serif text-xl px-5 py-1.5">つくったもの！</span>
	</div>
	<ArticleTimeline works={data.allWorks} />
</div>
