<script lang="ts">
	import NormalButton from '$lib/components/uiParts/Button/normalButton.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	console.log(data.log);
</script>

<h2 class="text-center">{data.greeting}</h2>

<p class="h2 text-center font-serif text-2xl">うすゆきについて</p>
<NormalButton title="もっと知る！" url="/about" bgColorVariable="blue" textColorVariable="black" />
