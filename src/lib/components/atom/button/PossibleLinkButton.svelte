<script lang="ts">
	import { pressEasing } from "$lib/utils/actions/pressEasing";

	export let title: string = "";
	export let link: string | null;
	export let borderColor: string = "blue";
	export let className: string = "";
</script>

<p class={className}>
	{#if link !== null && link !== ''}
		<a
			href={link}
			target="_blank"
			rel="noopener noreferrer"
			use:pressEasing
			class={`text-xl mx-2 my-4 rounded-2xl border-${borderColor} hover:bg-${borderColor} hover:text-white transition-colors duration-300 border-2 p-2`}
		>
			{title}
		</a>
	{:else}
		<span class={`cursor-no-drop text-xl mx-2 my-4 rounded-2xl bg-gray-400 p-2 line-through`}>
			{title}
		</span>
	{/if}
</p>
