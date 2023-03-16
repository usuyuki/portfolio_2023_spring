<script>
	export let title = '';
	export let link = '';
	export let borderColor = 'blue';
	export let className = '';
</script>

<p class={className}>
	{#if link !== ''}
		<a
			href={link}
			target="_blank"
			rel="noopener noreferrer"
			class={`text-xl mx-2 my-4 rounded-2xl border-${borderColor} hover:bg-${borderColor} hover:text-white duration-300 border-2 border-dotted p-2`}
		>
			{title}
		</a>
	{:else}
		<span class={`cursor-no-drop text-xl mx-2 my-4 rounded-2xl bg-gray-400 p-2 line-through`}>
			{title}
		</span>
	{/if}
</p>
