<script lang="ts">
import { navigating } from "$app/stores";
import ScreenFrame from "$lib/components/atom/frame/ScreenFrame.svelte";
import PageTransition from "$lib/components/atom/loading/PageTransition.svelte";
import Footer from "$lib/components/molecule/footer/Footer.svelte";
import CircleMenu from "$lib/components/molecule/menu/CircleMenu.svelte";
import "../app.css";
</script>

<ScreenFrame />
<CircleMenu />
{#if $navigating}
	<PageTransition />
{/if}
<main>
	<slot />
</main>
<Footer />
