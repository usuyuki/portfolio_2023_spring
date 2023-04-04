<script lang="ts">
	export let greeting: string;
	export let className = '';
</script>

<div class={` ${className}`}>
	<p class="text-center mt-20 mb-4 mx-4 text-xl">{greeting}</p>
</div>

<style>
	/* ふわっとでてくる */
	p {
		animation: fadeUp 0.5s;
		animation-delay: var(--after-access-counter-time);
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
