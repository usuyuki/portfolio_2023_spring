<script lang="ts">
	export let greeting: string;
	export const className = "";
</script>

<div class="balloon relative {className}">
	<div class="balloon-tip"></div>
	<p class="text-left text-lg">{greeting}</p>
</div>

<style>
	/* アイコンのフェードイン(+page.svelteの.icon-greeting .icon)と同じタイミングでふわっとでてくる */
	.balloon {
		animation: fadeUp 0.5s;
		animation-delay: var(--after-access-counter-time);
		animation-fill-mode: forwards;
		opacity: 0;
		margin-bottom: 0.75rem;
		padding: 0.75rem 1rem;
		max-width: 260px;
		background-color: var(--ui-bg);
		border-radius: 1rem;
	}

	.balloon-tip {
		position: absolute;
		left: 50%;
		bottom: -0.5rem;
		transform: translateX(-50%);
		width: 0;
		height: 0;
		border-left: 0.5rem solid transparent;
		border-right: 0.5rem solid transparent;
		border-top: 0.5rem solid var(--ui-bg);
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
