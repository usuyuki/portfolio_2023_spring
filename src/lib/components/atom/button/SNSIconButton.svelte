<script lang="ts">
	import { pressEasing } from "$lib/utils/actions/pressEasing";

	export let link: string;
	export let logo: string;
	export let alt: string;
	export let className: string = "";
</script>

<a
	href={link}
	target="_blank"
	rel="noopener noreferrer"
	use:pressEasing
	class="box w-14 h-14 flex items-center justify-center rounded-2xl bg-white"
>
	<img {alt} src={logo} loading="lazy" class={`${className} w-6 h-6 object-contain`} />
</a>
