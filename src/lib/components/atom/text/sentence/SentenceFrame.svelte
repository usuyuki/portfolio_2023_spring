<script lang="ts">
// biome-ignore lint/style/useConst: These are Svelte component props
export let title: string = "";
// biome-ignore lint/style/useConst: These are Svelte component props
export let content: string = "";
// biome-ignore lint/style/useConst: These are Svelte component props
export let borderColor: "black" | "pink" | "blue" | "yellow" = "black";
// biome-ignore lint/style/useConst: These are Svelte component props
export let className: string = "";
</script>

<div class={className}>
	<div class={`m-2 flex relative border-2 h-fit h-full border-dotted border-${borderColor}`}>
		<p class="p-4 mt-2">{content}</p>
		<h4 class="absolute -top-6 left-4 p-2 rounded-xl bg-white text-lg">{title}</h4>
	</div>
</div>
