<script lang="ts">
	export let animationDuration = '1s';
	export let animationDelay = '0';
	export let color = 'blue';
	export let className = '';
</script>

<div
	class={`burst-wrapper ${className}`}
	style="--burst-color:var(--{color});--animation-duration:{animationDuration};--animation-delay:{animationDelay};"
>
	<span style="--index: 0;"></span>
	<span style="--index: 1;"></span>
	<span style="--index: 2;"></span>
	<span style="--index: 3;"></span>
	<span style="--index: 4;"></span>
	<span style="--index: 5;"></span>
	<span style="--index: 6;"></span>
	<span style="--index: 7;"></span>
</div>

<style>
	div {
		/* 1つあたりに割り当てられる角度の計算 */
		--numberOfElement: 8;
		--perAngle: calc(360deg / var(--numberOfElement));
	}
	.burst-wrapper {
		height: 60px;
		width: 60px;
		pointer-events: none;
	}
	.burst-wrapper span {
		position: absolute;
		/* 真ん中にする */
		top: 50%;
		left: 50%;
		width: 6px;
		height: 15px;
		background: var(--burst-color);
		border-radius: 2rem;
		opacity: 0;
		/* 円形配置 */
		/* この要素の角度の計算 */
		--angle: calc(var(--perAngle) * var(--index));
		--x: calc(cos(var(--angle)) * 30px);
		--y: calc(sin(var(--angle)) * 30px);
		translate: calc(var(--x) - 50%) calc(var(--y) - 50%);
		/* 長方形が中心に向かうようにする */
		transform: rotateZ(calc(-90deg + (var(--perAngle) * var(--index))));

		animation: burst var(--animation-duration) ease-out forwards;
		animation-delay: var(--animation-delay);
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
