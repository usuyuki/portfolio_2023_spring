<script lang="ts">
export let title: string;
</script>

<div class="px-2 mt-4">
	<h2 class="text-xl">{title}</h2>
	<slot />
</div>
