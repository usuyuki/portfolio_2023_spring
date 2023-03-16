<script>
	export let title = '';
	export let content = '';
	export let borderColor = 'black';
	export let className = '';
</script>

<div class={className}>
	<div class={`m-2 flex relative border-2 border-dotted border-${borderColor}`}>
		<p class="p-4 mt-2">{content}</p>
		<h4 class="absolute -top-6 left-4 p-2 rounded-xl bg-white text-lg">{title}</h4>
	</div>
</div>
