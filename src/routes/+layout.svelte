<script>
	import '../app.css';
	import Footer from './footer.svelte';
	import Header from './header.svelte';
	import LeftMenu from './leftMenu.svelte';
</script>

<Header />
<LeftMenu />
<main>
	<slot />
</main>
<Footer />
