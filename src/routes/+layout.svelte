<script lang="ts">
	import ScreenFrame from "$lib/components/atom/frame/ScreenFrame.svelte";
	import SceneTransition from "$lib/components/atom/loading/SceneTransition.svelte";
	import Footer from "$lib/components/molecule/footer/Footer.svelte";
	import "../app.css";
</script>

<ScreenFrame />
<SceneTransition>
	<main>
		<slot />
	</main>
</SceneTransition>
<Footer />
