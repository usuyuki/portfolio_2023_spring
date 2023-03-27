<script lang="ts">
	import github from '$lib/assets/icon/github-mark.png';
	import keybase from '$lib/assets/icon/keybase-official.svg';
	import misskey from '$lib/assets/icon/misskey-logo.png';
	import qiita from '$lib/assets/icon/qiita-icon.png';
	import twitter from '$lib/assets/icon/Twitter-social-icons-circle-blue.png';
	import usuyukiBlog from '$lib/assets/icon/usuyukiBlog-icon.png';
	import youtube from '$lib/assets/icon/youtube_social_icon_red.png';
	import zenn from '$lib/assets/icon/zenn-logo.svg';
	import SnsIconButton from '$lib/components/atom/button/SNSIconButton.svelte';
</script>

<div class="flex justify-center flex-wrap">
	<SnsIconButton link="https://m5y.usuyuki.net/@usuyuki" alt="misskey logo" logo={misskey} />
	<SnsIconButton link="https://github.com/usuyuki" alt="github logo" logo={github} />
	<SnsIconButton link="https://twitter.com/usuyuki26" alt="twitter logo" logo={twitter} />
	<SnsIconButton link="https://www.youtube.com/@usuyuki" alt="youtube logo" logo={youtube} />
	<SnsIconButton link="https://qiita.com/Usuyuki" alt="qiita logo" logo={qiita} />
	<SnsIconButton link="https://zenn.dev/usuyuki" alt="zenn logo" logo={zenn} />
	<SnsIconButton link="https://keybase.io/usuyuki" alt="keybase logo" logo={keybase} />
	<SnsIconButton link="https://blog.usuyuki.net" alt="blog logo" logo={usuyukiBlog} />
</div>
