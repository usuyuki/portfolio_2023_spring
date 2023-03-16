<script>
	export let emoji = '✍';
	export let content = '';
	export let bgColor = 'black';
	export let className = '';
</script>

<div class={className}>
	<div class="flex justify-center items-center p-4">
		<div
			class={`flex justify-center items-center p-2 bg-${bgColor} text-xl rounded-full cursor-pointer shadow-xl hover:shadow-2xl duration-300`}
		>
			<p>{emoji}</p>
		</div>
		<p class="ml-2">{content}</p>
	</div>
</div>
