<svelte:head>
    <title>技術スタック</title> 
		<meta name="description" content="シェフのきまぐれ技術スタック" />
</svelte:head>
<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>
{#each Object.entries(data.data) as [title,techStacks]}
<h2 class="text-3xl text-center mx-4">{title}</h2>
<div class="flex justify-center items-center flex-wrap">
	{#each techStacks as techStack}
<div class="techStackPercent m-4 flex justify-center items-center w-60 h-60 rounded-full" style="--power:{techStack.power}%">
	<h2 class="text-2xl techStackName">{techStack.name}</h2>
</div>
		<div class="flex flex-col jusify-center items-center px-4 py-2 md:w-1/4 w-1/2">
			<p class="">{techStack.content}</p>
		</div>
	{/each}
</div>
	{/each}

<style>
/* 結果となる%変数 */
@property --power{
  syntax: '<percentage>';
  inherits: false;
  initial-value: 0%;
}
/* アニメーション用で動的に変わる%変数 */
@property --percent{
  syntax: '<percentage>';
  inherits: false;
  initial-value: 0%;
}
@keyframes circleAnim {
  0% {
		--percent:0%;
  }
  99.9%,
  to {
    --percent:var(--power);
  }
}
.techStackPercent {
  animation: circleAnim 1s forwards;
	  background-image: conic-gradient(var(--blue) 0%,var(--blue) var(--percent), gray calc(var(--percent) * 1.01) 100%);
}
</style>
