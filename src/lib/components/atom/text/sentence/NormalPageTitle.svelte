<script lang="ts">
	export let title: string;
</script>

<h1 class="text-4xl text-center font-serif mt-4 mb-12">{title}</h1>

<style>
	h1 {
		animation: fadeUp 0.5s;
		animation-fill-mode: forwards;
		opacity: 0;
	}

	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(50px);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
