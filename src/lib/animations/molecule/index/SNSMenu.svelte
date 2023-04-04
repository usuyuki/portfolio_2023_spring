<script lang="ts">
	import Burst from '$lib/animations/atom/Burst.svelte';
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
	<div class="relative p-2">
		<div class="sns-icon-wrapper" style="--delay:0.2s">
			<SnsIconButton
				link="https://m5y.usuyuki.net/@usuyuki"
				alt="misskey logo"
				logo={misskey}
			/>
		</div>
		<Burst
			color="blue"
			className="absolute top-0"
			animationDelay="2.1s"
			animationDuration="0.5s"
		/>
	</div>
	<div class="relative p-2">
		<div class="sns-icon-wrapper" style="--delay:0.3s">
			<SnsIconButton link="https://github.com/usuyuki" alt="github logo" logo={github} />
		</div>
		<Burst
			color="pink"
			className="absolute top-0"
			animationDelay="2.2s"
			animationDuration="0.5s"
		/>
	</div>
	<div class="relative p-2">
		<div class="sns-icon-wrapper" style="--delay:0.4s">
			<SnsIconButton link="https://twitter.com/usuyuki26" alt="twitter logo" logo={twitter} />
		</div>
		<Burst
			color="yellow"
			className="absolute top-0"
			animationDelay="2.3s"
			animationDuration="0.5s"
		/>
	</div>
	<div class="relative p-2">
		<div class="sns-icon-wrapper" style="--delay:0.5s">
			<SnsIconButton
				link="https://www.youtube.com/@usuyuki"
				alt="youtube logo"
				logo={youtube}
			/>
		</div>
		<Burst
			color="blue"
			className="absolute top-0"
			animationDelay="2.4s"
			animationDuration="0.5s"
		/>
	</div>
	<div class="relative p-2">
		<div class="sns-icon-wrapper" style="--delay:0.6s">
			<SnsIconButton link="https://qiita.com/Usuyuki" alt="qiita logo" logo={qiita} />
		</div>
		<Burst
			color="pink"
			className="absolute top-0"
			animationDelay="2.5s"
			animationDuration="0.5s"
		/>
	</div>
	<div class="relative p-2">
		<div class="sns-icon-wrapper" style="--delay:0.7s">
			<SnsIconButton link="https://zenn.dev/usuyuki" alt="zenn logo" logo={zenn} />
		</div>
		<Burst
			color="yellow"
			className="absolute top-0"
			animationDelay="2.6s"
			animationDuration="0.5s"
		/>
	</div>
	<div class="relative p-2">
		<div class="sns-icon-wrapper" style="--delay:0.8s">
			<SnsIconButton link="https://keybase.io/usuyuki" alt="keybase logo" logo={keybase} />
		</div>
		<Burst
			color="blue"
			className="absolute top-0"
			animationDelay="2.7s"
			animationDuration="0.5s"
		/>
	</div>
	<div class="relative p-2">
		<div class="sns-icon-wrapper" style="--delay:0.9s">
			<SnsIconButton link="https://blog.usuyuki.net" alt="blog logo" logo={usuyukiBlog} />
		</div>
		<Burst
			color="pink"
			className="absolute top-0"
			animationDelay="2.8s"
			animationDuration="0.5s"
		/>
	</div>
</div>

<style>
	/* ふわっとでてくる */
	.sns-icon-wrapper {
		animation: bigger 0.3s;
		animation-fill-mode: forwards;
		animation-delay: calc(var(--opening-time) + var(--delay));
		transform: scale(0);
		opacity: 0;
	}

	@keyframes bigger {
		from {
			opacity: 0;
			transform: scale(0);
		}

		to {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
