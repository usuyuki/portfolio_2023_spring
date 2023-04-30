<script lang="ts">
	import ScreenFrame from '$lib/components/atom/frame/ScreenFrame.svelte';
	import Footer from '$lib/components/molecule/footer/Footer.svelte';
	import LeftMenu from '$lib/components/molecule/menu/LeftMenu.svelte';
	import '../app.css';
</script>

<ScreenFrame />
<LeftMenu />
<main>
	<slot />
</main>
<Footer />
