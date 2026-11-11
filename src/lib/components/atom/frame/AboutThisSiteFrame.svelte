<script lang="ts">
	import type { Snippet } from "svelte";
	interface Props {
		title: string;
		children?: Snippet;
	}

	let { title, children }: Props = $props();
</script>

<div class="box p-6 mb-6 bg-white">
	<h2 class="serif text-xl mb-2">{title}</h2>
	{@render children?.()}
</div>
