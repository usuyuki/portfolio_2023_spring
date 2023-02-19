<script>
	import Footer from '$lib/components/uiGroup/Element/fotoer.svelte';
	import Header from '$lib/components/uiGroup/Element/header.svelte';
	import '../app.css';
	import LeftMenu from '../lib/components/uiGroup/Element/leftMenu.svelte';
</script>

<Header />
<LeftMenu />
<main>
	<slot />
</main>
<Footer />
