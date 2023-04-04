<div class="burst-wrapper">
	<span style="--index: 0;" />
	<span style="--index: 1;" />
	<span style="--index: 2;" />
	<span style="--index: 3;" />
	<span style="--index: 4;" />
	<span style="--index: 5;" />
	<span style="--index: 6;" />
	<span style="--index: 7;" />
</div>

<style>
	.burst-wrapper {
		position: relative;
		height: 60px;
		width: 60px;
	}
	.burst-wrapper span {
		position: absolute;
		/* 真ん中にする */
		top: 50%;
		left: 50%;
		width: 6px;
		height: 15px;
		background: var(--blue);
		border-radius: 2rem;
		/* 円形配置 */
		--angle: calc(360deg / 8 * var(--index));
		--x: calc(cos(var(--angle)) * 30px);
		--y: calc(sin(var(--angle)) * 30px);
		translate: calc(var(--x) - 50%) calc(var(--y) - 50%);
		/* 長方形が中心に向かうようにする */
		transform: rotateZ(calc(-90deg + (45deg * var(--index))));

		animation: burst 1s ease-out forwards;
	}
	/* 弾けるアニメーション */
	@keyframes burst {
		0% {
			translate: calc((cos(var(--angle)) * 10px) - 50%) calc((sin(var(--angle)) * 10px) - 50%);
			opacity: 0;
		}
		50% {
			/* translate: calc((cos(var(--angle)) * 30px) - 50%) calc((sin(var(--angle)) * 30px) - 50%); */
			opacity: 1;
		}
		100% {
			translate: calc((cos(var(--angle)) * 50px) - 50%) calc((sin(var(--angle)) * 50px) - 50%);
			opacity: 0;
		}
	}
</style>
