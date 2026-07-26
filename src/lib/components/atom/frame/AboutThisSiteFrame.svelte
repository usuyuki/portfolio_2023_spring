<script lang="ts">
	import type { Snippet } from "svelte";

	let { title, children }: { title: string; children?: Snippet } = $props();
</script>

<div class="px-2 mt-4">
	<h2 class="text-xl">{title}</h2>
	{@render children?.()}
</div>
