<script lang="ts">
	import NormalHead from '$lib/components/atom/head/NormalHead.svelte';
</script>

<NormalHead
	title="カラー置き場"
	slug="/souko"
	description="Tailwindのクラス生成のために作っているページ"
/>

<h1 class="text-2xl">カラー置き場</h1>
<div class="flex">
	<div class="w-20 h-20 bg-white hover:bg-white" />
	<div class="w-20 h-20 bg-black hover:bg-black" />
	<div class="w-20 h-20 bg-pink hover:bg-pink" />
	<div class="w-20 h-20 bg-yellow hover:bg-yellow" />
	<div class="w-20 h-20 bg-blue hover:bg-blue" />
</div>

<div class="flex">
	<p class="text-2xl text-black p-2 border-black hover:text-black">あああ</p>
	<p class="text-2xl text-white p-2 border-white hover:text-white">あああ</p>
	<p class="text-2xl text-pink p-2 border-pink hover:text-pink">あああ</p>
	<p class="text-2xl text-yellow p-2 border-yellow hover:text-yellow">あああ</p>
	<p class="text-2xl text-blue p-2 border-blue hover:text-blue">あああ</p>
</div>
