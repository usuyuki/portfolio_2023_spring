<script lang="ts">
	export let link: string;
	export let logo: string;
	export let alt: string;
	export let className = '';
</script>

<a class={`${className}`} href={link} target="_blank" rel="noopener noreferrer">
	<img
		{alt}
		src={logo}
		loading="lazy"
		class="w-12 h-12 object-contain px-2 bg-gray-200 rounded-xl"
	/>
</a>
