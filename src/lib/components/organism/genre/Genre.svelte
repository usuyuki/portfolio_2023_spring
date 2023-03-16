<script>
	export let title="";
	export let content="";
	export let borderColor = 'black';
</script>

<div class={`m-2 flex relative border-2 border-dotted border-${borderColor}`}>
  <p class="p-4">{content}</p>
  <h4 class="aboslute top-4 -left-8 p-4 bg-white text-xl">{title}</h4>
</div>
