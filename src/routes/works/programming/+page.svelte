<script lang="ts">
	import NormalHead from "$lib/components/atom/head/NormalHead.svelte";
	import NormalPageTitle from "$lib/components/atom/text/sentence/NormalPageTitle.svelte";
</script>

<NormalHead title="プログラミング作品" description="プログラミングで作ったもの" />
<NormalPageTitle title="プログラミング作品" />

<p class="text-center text-xl mt-4 md:mt-20 mb-4">
	ここはプログラミング関係の<br class="md:hidden" />制作物のページです。
</p>
<div class="flex justify-center flex-wrap items-center mb-20">
	<!-- <img loading="lazy" class="p-4" src="https://raw.githubusercontent.com/usuyuki/usuyuki/master/profile-summary-card-output/solarized/0-profile-details.svg" alt="コミットグラフ" />-->
	<img
		loading="lazy"
		class="p-4"
		src="https://raw.githubusercontent.com/usuyuki/usuyuki/master/profile-summary-card-output/solarized/3-stats.svg"
		alt="他GitHubの情報"
	/>
	<img
		loading="lazy"
		class="p-4"
		src="https://raw.githubusercontent.com/usuyuki/usuyuki/master/profile-summary-card-output/solarized/2-most-commit-language.svg"
		alt="コミット言語円グラフ"
	/>
	<img
		loading="lazy"
		class="p-4"
		src="https://raw.githubusercontent.com/usuyuki/usuyuki/master/profile-summary-card-output/solarized/1-repos-per-language.svg"
		alt="リポジトリ言語円グラフ"
	/>
</div>
<!-- +layout.svelteに全体のビューを書くことで、個ページに行ったときのAPI叩き回数を減らす -->
