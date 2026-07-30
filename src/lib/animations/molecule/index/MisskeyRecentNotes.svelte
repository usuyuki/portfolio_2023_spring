<script lang="ts">
	import { onDestroy } from "svelte";
	import misskeyLogo from "$lib/assets/icon/misskey-logo.png";
	import usuyukiIcon from "$lib/assets/icon/usuyukiIcon.png";
	import type { misskeyContentType } from "$lib/types/misskeyContent";
	import { pressEasing } from "$lib/utils/actions/pressEasing";
	import { onOpeningFinished } from "$lib/utils/openingEvent";

	export let notes: misskeyContentType[] = [];

	// 何件目を表示しているか。数秒おきに切り替える
	let currentIndex = 0;
	// フリップアニメーション中かどうか(trueの間だけCSSアニメーションを再生させる)
	let flipping = false;
	// オープニング完了前はカードをopacity:0のまま隠しておき、完了後にクラス付与でアニメーションを開始する
	// (他の演出と同じ待ち時間だと埋もれるため、SNSMenu等より少し遅らせて最後に登場させる程度に留める)
	let started = false;

	const SWITCH_INTERVAL_MS = 5000;
	const FLIP_DURATION_MS = 500;
	// 回転が90度になり吹き出しが真横を向いて見えなくなる瞬間(アニメーション中間点)で中身を差し替える
	const FLIP_MIDPOINT_MS = FLIP_DURATION_MS / 2;
	// オープニング完了から、SNSアイコンの登場演出が一巡するまでの時間だけ間を置いて登場させる
	const SHOW_DELAY_MS = 900;

	// setTimeout/setIntervalのIDを保持し、コンポーネント破棄時にまとめてクリアする
	let showTimeoutId: ReturnType<typeof setTimeout>;
	let switchIntervalId: ReturnType<typeof setInterval>;
	let flipMidTimeoutId: ReturnType<typeof setTimeout>;
	let flipEndTimeoutId: ReturnType<typeof setTimeout>;

	// オープニング演出が完了(またはスキップ/再訪問で不要)になったのを待ってから表示する
	const unsubscribe = onOpeningFinished(() => {
		if (notes.length > 1) {
			showTimeoutId = setTimeout(() => {
				started = true;
				switchIntervalId = setInterval(() => {
					flipping = true;
					flipMidTimeoutId = setTimeout(() => {
						currentIndex = (currentIndex + 1) % notes.length;
					}, FLIP_MIDPOINT_MS);
					flipEndTimeoutId = setTimeout(() => {
						flipping = false;
					}, FLIP_DURATION_MS);
				}, SWITCH_INTERVAL_MS);
			}, SHOW_DELAY_MS);
		} else if (notes.length === 1) {
			showTimeoutId = setTimeout(() => {
				started = true;
			}, SHOW_DELAY_MS);
		}
	});
	onDestroy(() => {
		unsubscribe();
		clearTimeout(showTimeoutId);
		clearInterval(switchIntervalId);
		clearTimeout(flipMidTimeoutId);
		clearTimeout(flipEndTimeoutId);
	});

	$: currentNote = notes[currentIndex];
</script>

{#if notes.length > 0}
	<div class="flex justify-center mt-12 note-wrapper" class:started>
		<div class="note-card mx-4 p-4 rounded-2xl bg-white shadow-md">
			<div class="flex items-center justify-center gap-2 mb-2">
				<p class="h2 text-center font-serif text-xl">最近のうすゆき</p>
				<a
					href="https://m5y.usuyuki.net/@usuyuki"
					target="_blank"
					rel="noopener noreferrer"
					use:pressEasing
					class="flex items-center gap-1 text-xs text-black/50 hover:text-black/80 transition-colors duration-300"
				>
					from misskey
					<img alt="misskey logo" class="w-3 h-3" src={misskeyLogo} />
				</a>
			</div>
			<div class="flex items-start flex-1 min-h-0">
				<img
					alt="うすゆきアイコン"
					class="w-12 h-12 rounded-full flex-shrink-0"
					src={usuyukiIcon}
				/>
				<div class="balloon relative ml-4 flex-1 min-w-0">
					<div class="balloon-tip"></div>
					<div class="flip-container" class:flipping>
						<a
							href={currentNote.link}
							target="_blank"
							rel="noopener noreferrer"
							use:pressEasing
							class="block"
						>
							<p class="note-text whitespace-pre-wrap break-words">
								{currentNote.text}
							</p>
							<p class="text-sm text-black/60 mt-1">{currentNote.date}</p>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	/* WelcomeGreeting等と同じく、オープニング完了前はopacity:0で止めておき
	   .startedが付いたらfadeUpを再生する(常にDOM上にありスペースは確保済みのため、
	   出現時にレイアウトシフトも唐突感も起きない) */
	.note-wrapper {
		animation: fadeUp 0.5s;
		animation-play-state: paused;
		animation-fill-mode: forwards;
		opacity: 0;
	}

	.note-wrapper.started {
		animation-play-state: running;
	}

	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(50px);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* 投稿の長さによってカード全体の大きさがガタつかないよう、幅・高さともに固定する */
	.note-card {
		width: 576px;
		max-width: calc(100vw - 2rem);
		height: 208px;
		display: flex;
		flex-direction: column;
	}

	.balloon {
		background-color: var(--ui-bg);
		border-radius: 1rem;
		padding: 0.75rem 1rem;
	}

	.balloon-tip {
		position: absolute;
		left: -0.5rem;
		top: 1rem;
		width: 0;
		height: 0;
		border-top: 0.5rem solid transparent;
		border-bottom: 0.5rem solid transparent;
		border-right: 0.5rem solid var(--ui-bg);
	}

	/* 投稿文の長さに関わらず高さを揃えるため3行固定にし、はみ出た分は...で省略する */
	/* line-heightを明示してmin-heightを3行分確保し、短い投稿でも吹き出しの高さが縮まないようにする */
	.note-text {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		line-height: 1.5rem;
		min-height: calc(1.5rem * 3);
	}

	/* 吹き出しの中身だけ横倒しにフリップして切り替わる演出(アイコンは回転させない) */
	.flip-container {
		transform-style: preserve-3d;
		backface-visibility: hidden;
		transform-origin: center;
	}

	.flip-container.flipping {
		animation: flip 0.5s ease-in-out;
	}

	@keyframes flip {
		0% {
			transform: rotateX(0deg);
			opacity: 1;
		}
		50% {
			transform: rotateX(90deg);
			opacity: 0;
		}
		100% {
			transform: rotateX(0deg);
			opacity: 1;
		}
	}
</style>
