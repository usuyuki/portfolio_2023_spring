<script lang="ts">
	import { pressEasing } from "$lib/utils/actions/pressEasing";
</script>

<footer>
	<div class="flex flex-wrap justify-center gap-4 my-4 mx-2">
		<a class="box tag px-4 py-2" href="/links" use:pressEasing>リンク</a>
		<a class="box tag px-4 py-2" href="/aboutThisSite" use:pressEasing>このサイトについて</a>
	</div>
	<p class="tag text-xs opacity-70 mt-6 mb-2">© USUYUKI.NET</p>
</footer>

<style>
	footer {
		min-height: var(--footer-height);
		margin-top: 100px;
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	footer > div {
		max-width: var(--main-max-width);
	}
	.tag {
		font-family: var(--tag-font);
		font-size: 13px;
		border-radius: 999px;
		box-shadow: 4px 4px 0 var(--black);
	}
</style>
