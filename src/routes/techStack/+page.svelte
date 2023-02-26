<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	console.log(data.environment);
</script>
<h2 class="text-3xl text-center mx-4">言語</h2>
<div class="flex justify-center items-center flex-wrap">
	{#each data.data['language'] as techStack}
	<div class="flex jusity-center ">

<div class="techStackBox">
	<svg class="relative">
  <circle class="techStackPercent" style={"stroke-dashoffset: calc(440 - (440 *"+techStack.power+" / 100));"} cx="75" cy="75" r="70" stroke-width="3"/>
  </svg>
	<h2 class="text-2xl techStackName">{techStack.name}</h2>
</div>
		<div class="flex flex-col jusify-center items-center px-4 py-2 md:w-1/4 w-1/2">
			<p class="">{techStack.content}</p>
		</div>
	</div>
	{/each}
</div>

<style>
.techStackBox {
	position: relative;
}
.techStackName {
	position: absolute;
	top: 50%;
	right: 50%;
	transform: translate(-50%, -50%);
}

svg {
  transform: rotate(-90deg);
width:100%;
}
.techStackPercent {
	
	fill:rgba(0,0,0,0);
	stroke: var(--blue);
  animation: circleAnim 1s forwards;
}
@keyframes circleAnim {
  0% {
    stroke-dasharray: 0 440;
  }
  99.9%,
  to {
    stroke-dasharray: 440 440;
  }
}
</style>
