<script lang="ts">
	import type { Snippet } from "svelte";
	import ScreenFrame from "#lib/components/atom/frame/ScreenFrame.svelte";
	import SceneTransition from "#lib/components/atom/loading/SceneTransition.svelte";
	import Footer from "#lib/components/molecule/footer/Footer.svelte";
	import "../app.css";
	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<ScreenFrame />
<SceneTransition>
	<main>
		{@render children?.()}
	</main>
</SceneTransition>
<Footer />
