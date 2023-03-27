<header>
	<a href="/">
		<p class="text-center">うすゆきどっとねっと</p>
	</a>
</header>

<style>
	header {
		height: var(--heder-height);
		backdrop-filter: blur(4px);
		display: flex;
		justify-content: center;
		align-items: center;
	}
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

	p {
		width: 10em;
		border-right: 0.08em solid;
		border-color: transparent;
		overflow: hidden;
		white-space: nowrap;
		animation: typing 3s steps(10, end), caret 0.5s step-end 10;
	}
</style>
