<script lang="ts">
	import Footer from '$lib/components/molecule/footer/Footer.svelte';
	import Header from '$lib/components/molecule/header/Header.svelte';
	import LeftMenu from '$lib/components/molecule/menu/LeftMenu.svelte';
	import '../app.css';
</script>

<Header />
<LeftMenu />
<main>
	<slot />
</main>
<Footer />
