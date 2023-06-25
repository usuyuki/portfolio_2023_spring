<script lang="ts">
	import NormalHead from '$lib/components/atom/head/NormalHead.svelte';
	import NormalPageTitle from '$lib/components/atom/text/sentence/NormalPageTitle.svelte';
	import AboutThisSiteFrame from '$lib/components/atom/frame/AboutThisSiteFrame.svelte';
</script>

<NormalHead title="このサイトについて" description="このサイトについて" />
<NormalPageTitle title="このサイトについて" />
<AboutThisSiteFrame title="ソースコード">
	<p>ソースコードはGitHubにて公開しています。</p>
	<a
		href="https://github.com/usuyuki/portfolio_2023_spring"
		class="flex items-center my-2 mx-2"
		target="_blank"
		rel="noopener noreferrer">github.com/usuyuki/portfolio_2023_spring</a
	>
</AboutThisSiteFrame>
<AboutThisSiteFrame title="Google Analytics">
	<p>
		本ブログでは、Googleによるアクセス解析ツール「GoogleAnalytics」を利用しています。このGoogleAnalyticsはトラフィックデータの収集のためにクッキー（Cookie）を使用しております。トラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
	</p>
</AboutThisSiteFrame>
