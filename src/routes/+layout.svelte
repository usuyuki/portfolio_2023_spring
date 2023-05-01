<script lang="ts">
	import ScreenFrame from '$lib/components/atom/frame/ScreenFrame.svelte';
	import PageTransition from '$lib/components/atom/loading/PageTransition.svelte';
	import Footer from '$lib/components/molecule/footer/Footer.svelte';
	import LeftMenu from '$lib/components/molecule/menu/LeftMenu.svelte';
	import { navigating } from '$app/stores';
	import '../app.css';
</script>

<ScreenFrame />
{#if $navigating}
	<PageTransition />
{/if}
<LeftMenu />
<main>
	<slot />
</main>
<Footer />
