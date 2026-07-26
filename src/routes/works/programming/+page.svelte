<script lang="ts">
	import NormalHead from "$lib/components/atom/head/NormalHead.svelte";
	import NormalPageTitle from "$lib/components/atom/text/sentence/NormalPageTitle.svelte";
</script>

<NormalHead title="プログラミング作品" description="プログラミングで作ったもの" />
<NormalPageTitle title="プログラミング作品" tag="WORKS" />

<p class="text-center text-xl mt-4 mb-10">
	ここはプログラミング関係の<br class="md:hidden" />制作物のページです。
</p>

<div class="box flex justify-center flex-wrap items-center gap-4 mx-auto mb-20 p-6 max-w-4xl bg-white">
	<img
		loading="lazy"
		class="rounded-xl"
		src="https://raw.githubusercontent.com/usuyuki/usuyuki/master/profile-summary-card-output/solarized/3-stats.svg"
		alt="他GitHubの情報"
	/>
	<img
		loading="lazy"
		class="rounded-xl"
		src="https://raw.githubusercontent.com/usuyuki/usuyuki/master/profile-summary-card-output/solarized/2-most-commit-language.svg"
		alt="コミット言語円グラフ"
	/>
	<img
		loading="lazy"
		class="rounded-xl"
		src="https://raw.githubusercontent.com/usuyuki/usuyuki/master/profile-summary-card-output/solarized/1-repos-per-language.svg"
		alt="リポジトリ言語円グラフ"
	/>
</div>
<!-- +layout.svelteに全体のビューを書くことで、個ページに行ったときのAPI叩き回数を減らす -->
