<script lang="ts">
	export let emoji = '✍';
	export let content = '';
	export let emojiMean = '';
	export let bgColor = 'black';
	export let className = '';
</script>

<div class={className}>
	<div class="flex md:justify-center items-center p-4">
		<div class="group relative">
			<div
				class={`flex justify-end justify-center items-center p-2 bg-${bgColor} text-xl rounded-md md:rounded-full cursor-pointer shadow-xl hover:shadow-2xl duration-300`}
			>
				<p>{emoji}</p>
			</div>
			<div
				class="md:invisible md:opacity-0 absolute -top-7 md:top-12 md:-left-12 z-10 w-40 flex md:justify-center group-hover:visible group-hover:opacity-100 duration-300 bg-black text-white p-2 rounded-md md:rounded-lg"
			>
				<p>
					{emojiMean}
				</p>
			</div>
		</div>
		<p class="ml-2 mt-2 md:mt-0">{content}</p>
	</div>
</div>
