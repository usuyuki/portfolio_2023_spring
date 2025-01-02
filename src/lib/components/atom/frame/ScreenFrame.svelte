<!-- 画面の上下左右に帯を作る -->
<!-- デフォルトのposition:staticだとzindex付けれないのでトップもfixedにしている, z-50がtailwindの最大なのでこれを超えてきたらコンポーネント側を疑う -->
<div class="fixed z-50">
	<header id="top" class="flex justify-center items-center">
		<a href="/">
			<p class="text-sm text-center md:text-xl">うすゆきどっとねっと</p>
		</a>
	</header>
	<div id="bottom"></div>
	<div id="left" class=""></div>
	<div id="right"></div>
</div>

<style>
	@keyframes typing {
		from {
			width: 0;
		}
	}
	@keyframes caret {
		50% {
			border-color: var(--black);
		}
	}
	@keyframes fadeout {
		50% {
			border-right: 0;
		}
	}
	div {
		--z-index: 50;
	}

	p {
		border-right: 0.08em solid;
		border-color: transparent;
		overflow: hidden;
		white-space: nowrap;
		animation:
			typing 3s steps(10, end),
			caret 0.5s step-end 10;
	}
	#left {
		/* トップdivのfixedはz-index指定のために必要、このfixedは表示のために必要 */
		position: fixed;
		top: 0;
		left: 0;
		width: var(--lr-frame-width);
		height: 100vh;
		background-color: var(--pink);
	}
	#right {
		position: fixed;
		top: 0;
		right: 0;
		width: var(--lr-frame-width);
		height: 100vh;
		background-color: var(--pink);
	}
	#top {
		position: fixed;
		top: 0;
		right: 0;
		width: 100vw;
		height: var(--tb-frame-width);
		background-color: var(--blue);
	}
	#bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100vw;
		height: var(--tb-frame-width);
		background-color: var(--blue);
	}
</style>
