<script lang="ts">
	import { fly } from "svelte/transition";
	import misskeyLogo from "$lib/assets/icon/misskey-logo.png";
	import usuyukiIcon from "$lib/assets/icon/usuyukiIcon.png";
	import type { misskeyContentType } from "$lib/types/misskeyContent";
	import { pressEasing } from "$lib/utils/actions/pressEasing";

	export let notes: misskeyContentType[] = [];

	// 何件目を表示しているか。数秒おきに切り替える
	let currentIndex = 0;
	// フリップアニメーション中かどうか(trueの間だけCSSアニメーションを再生させる)
	let flipping = false;
	// オープニング〜挨拶メッセージのアニメーションが終わるまでは表示しない
	let visible = false;

	const SWITCH_INTERVAL_MS = 5000;
	const FLIP_DURATION_MS = 500;
	// 回転が90度になり吹き出しが真横を向いて見えなくなる瞬間(アニメーション中間点)で中身を差し替える
	const FLIP_MIDPOINT_MS = FLIP_DURATION_MS / 2;
	// --after-greeting-message-time(app.css)と同じ値(挨拶メッセージが終わった時間)。CSS変数はJS側から参照できないため直値で合わせる
	// opening-time(4000) + 700 + 3400 + 700 = 8800ms
	const SHOW_DELAY_MS = 8800;

	if (notes.length > 1) {
		setTimeout(() => {
			visible = true;
			setInterval(() => {
				flipping = true;
				setTimeout(() => {
					currentIndex = (currentIndex + 1) % notes.length;
				}, FLIP_MIDPOINT_MS);
				setTimeout(() => {
					flipping = false;
				}, FLIP_DURATION_MS);
			}, SWITCH_INTERVAL_MS);
		}, SHOW_DELAY_MS);
	} else if (notes.length === 1) {
		setTimeout(() => {
			visible = true;
		}, SHOW_DELAY_MS);
	}

	$: currentNote = notes[currentIndex];
</script>

{#if notes.length > 0 && visible}
	<div class="flex justify-center mt-12" in:fly|global={{ y: 50, duration: 500 }}>
		<div class="max-w-xl w-full mx-4 p-4 rounded-2xl bg-white shadow-md">
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
			<div class="flex items-start">
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
