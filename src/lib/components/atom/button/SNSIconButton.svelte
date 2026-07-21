<script lang="ts">
	import { pressEasing } from "$lib/utils/actions/pressEasing";

	export let link: string;
	export let logo: string;
	export let alt: string;
	export let className: string = "";
</script>

<a href={link} target="_blank" rel="noopener noreferrer" use:pressEasing>
	<img
		{alt}
		src={logo}
		loading="lazy"
		class={`${className} w-12 h-12 object-contain px-2 bg-gray-200 rounded-xl`}
	/>
</a>
