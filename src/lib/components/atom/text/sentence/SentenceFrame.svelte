<script lang="ts">
	let {
		title = "",
		content = "",
		borderColor = "black",
		className = "",
	}: {
		title?: string;
		content?: string;
		borderColor?: "black" | "pink" | "blue" | "yellow";
		className?: string;
	} = $props();
</script>

<div class={className}>
	<div class={`m-2 flex relative border-2 h-fit h-full border-dotted border-${borderColor}`}>
		<p class="p-4 mt-2">{content}</p>
		<h4 class="absolute -top-6 left-4 p-2 rounded-xl bg-white text-lg">{title}</h4>
	</div>
</div>
