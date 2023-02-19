<script>
	import NormalButton from '$lib/components/uiParts/Button/normalButton.svelte';
	export let data;
	console.log(data.log);
</script>

<h2 class="text-center">{data.greeting}</h2>

<p class="h2 text-center font-serif text-2xl">うすゆきについて</p>
<NormalButton title="もっと知る！" url="/about" bgColorVariable="blue" textColorVariable="black" />
