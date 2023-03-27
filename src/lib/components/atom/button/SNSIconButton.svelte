<script lang="ts">
	export let link: string;
	export let logo: string;
	export let alt: string;
</script>

<a class="p-4" href={link} target="_blank" rel="noopener noreferrer">
	<img
		{alt}
		src={logo}
		loading="lazy"
		class="w-12 h-12 object-contain p-2 bg-gray-200 rounded-xl"
	/>
</a>
