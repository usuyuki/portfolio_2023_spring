<div class="animation-wrapper">
	<p>
		<!-- うすゆきどっとねっと -->
		<span>う</span>
		<span>す</span>
		<span>ゆ</span>
		<span>き</span>
		<span>ど</span>
		<span>っ</span>
		<span>と</span>
		<span>ね</span>
		<span>っ</span>
		<span>と</span>
	</p>
	<div class="rhombus" />
	<div class="ripples" />
	<div class="ripples-dotted" />
</div>

<style>
	/* 広がる波紋 */
	.ripples {
		width: 5%;
		aspect-ratio: 1/1;
		border-radius: 50%;
		position: absolute;
		top: 40%;
		left: 50%;
		z-index: 3;
		opacity: 0;
		background-color: var(--white);
		border: 1px solid var(--blue);
		animation: ripples 2s;
		animation-delay: 1.1s;
		animation-iteration-count: 1;
		animation-fill-mode: forwards;
	}
	@keyframes ripples {
		0% {
			transform: scale(0);
			opacity: 1;
		}
		99% {
			transform: scale(30);
		}
		/* 戻さないとサイトのwidthがぶっ壊れ倒す */
		100% {
			opacity: 0;
			transform: scale(0);
		}
	}

	.ripples-dotted {
		width: 5%;
		aspect-ratio: 1/1;
		border-radius: 50%;
		position: absolute;
		top: 40%;
		left: 50%;
		z-index: 3;
		opacity: 0;
		border: 1px dotted var(--yellow);
		animation: ripples-dotted 1s;
		animation-delay: 2s;
		animation-iteration-count: 1;
		animation-fill-mode: forwards;
	}
	@keyframes ripples-dotted {
		0% {
			transform: scale(30);
			opacity: 1;
		}
		100% {
			transform: scale(0);
			opacity: 0;
		}
	}
	/* 文字を取り巻く図形 */

	/* ひし形 */
	.rhombus {
		position: absolute;
		top: 40%;
		left: 50%;
		width: 40px;
		height: 40px;
		background: var(--pink);
		transform: skew(30deg, 30deg);
	}
	/** 文字関連 */
	p {
		/* font読み込みで崩れるので、ユーザーの端末で持つフォントを指定する */
		font-family: 'MS UI Gothic', 'Hiragino Kaku Gothic ProN', 'ヒラギノ角ゴ ProN W3', sans-serif;
		color: var(--white);
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		text-shadow: 0 2px 5px rgba(46, 46, 196, 0.8);
	}
	p > span {
		font-size: 3rem;
		margin: 0.2em 0.3rem;
	}
	/* スマホ向けはサイズ落とす */
	@media screen and (max-width: 768px) {
		p > span {
			font-size: 1.5rem;
		}
	}

	/* 文字を1つずつカクカクと動かして整列させる */
	span {
		animation-duration: 1s;
		animation-iteration-count: 1;
		animation-fill-mode: forwards;
	}
	span:nth-of-type(1) {
		animation-name: span1;
	}
	span:nth-of-type(2) {
		animation-name: span2;
	}
	span:nth-of-type(3) {
		animation-name: span3;
	}
	span:nth-of-type(4) {
		animation-name: span4;
	}
	span:nth-of-type(5) {
		animation-name: span5;
	}
	span:nth-of-type(6) {
		animation-name: span6;
	}
	span:nth-of-type(7) {
		animation-name: span7;
	}
	span:nth-of-type(8) {
		animation-name: span8;
	}
	span:nth-of-type(9) {
		animation-name: span9;
	}
	span:nth-of-type(10) {
		animation-name: span10;
	}

	@keyframes span1 {
		0% {
			transform: translate(70%, 40%);
		}
		20% {
			transform: translate(40%, 30%);
		}
		50% {
			transform: translate(10%, 30%);
		}
		80% {
			transform: translate(8%, 10%);
		}
		90% {
			transform: translate(5%, 5%);
		}
		100% {
			transform: translate(0, 0);
		}
	}
	@keyframes span2 {
		0% {
			transform: translate(30%, 40%);
		}
		50% {
			transform: translate(20%, 30%);
		}
		100% {
			transform: translate(0, 0);
		}
	}
	@keyframes span3 {
		0% {
			transform: translate(40%, 20%);
		}
		50% {
			transform: translate(30%, 40%);
		}
		100% {
			transform: translate(0, 0);
		}
	}
	@keyframes span4 {
		0% {
			transform: translate(50%, 50%);
		}
		50% {
			transform: translate(40%, 20%);
		}
		100% {
			transform: translate(0, 0);
		}
	}
	@keyframes span5 {
		0% {
			transform: translate(60%, 30%);
		}
		50% {
			transform: translate(50%, 50%);
		}
		100% {
			transform: translate(0, 0);
		}
	}
	@keyframes span6 {
		0% {
			transform: translate(70%, 60%);
		}
		50% {
			transform: translate(60%, 30%);
		}
		100% {
			transform: translate(0, 0);
		}
	}
	@keyframes span7 {
		0% {
			transform: translate(80%, 10%);
		}
		50% {
			transform: translate(70%, 60%);
		}
		100% {
			transform: translate(0, 0);
		}
	}
	@keyframes span8 {
		0% {
			transform: translate(90%, 70%);
		}
		50% {
			transform: translate(80%, 10%);
		}
		100% {
			transform: translate(0, 0);
		}
	}
	@keyframes span9 {
		0% {
			transform: translate(100%, 40%);
		}
		50% {
			transform: translate(90%, 70%);
		}
		100% {
			transform: translate(0, 0);
		}
	}
	@keyframes span10 {
		0% {
			transform: translate(110%, 80%);
		}
		50% {
			transform: translate(100%, 40%);
		}
		100% {
			transform: translate(0, 0);
		}
	}

	/* ラッパー自体のAnimation */
	.animation-wrapper {
		overflow: hidden;
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 0;
		left: 0;
		background-color: var(--black);
		/* 100%だと、スクロールバーの幅分が引かれてしまうので、calcで調整 */
		width: calc(100% - calc(100% - 100%));
		height: 100vh;
		animation: fadeout 0.5s;
		animation-delay: 1.5s;
		animation-iteration-count: 1;
		animation-fill-mode: forwards;
	}
	@keyframes fadeout {
		0% {
			opacity: 1;
			--overflow-rule: 'hidden';
		}
		99% {
			opacity: 0;
			height: 100%;
		}
		100% {
			height: 0;
			visibility: hidden;
		}
	}
</style>
