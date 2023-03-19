<script lang="ts">
	export let title: string;
	export let className = '';
</script>

<div class={`flex justify-center items-center ${className}`}>
	<h2 class="text-3xl mt-4 mb-6 border-b-2 border-pink">{title}</h2>
</div>
