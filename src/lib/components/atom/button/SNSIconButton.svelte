<script lang="ts">
	import { pressEasing } from "#lib/utils/actions/pressEasing.ts";

	interface Props {
		link: string;
		logo: string;
		alt: string;
		className?: string;
	}

	let { link, logo, alt, className = "" }: Props = $props();
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
