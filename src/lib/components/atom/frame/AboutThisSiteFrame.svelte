<script lang="ts">
	export let title: string;
</script>

<div class="box p-6 mb-6 bg-white">
	<h2 class="serif text-xl mb-2">{title}</h2>
	<slot />
</div>
