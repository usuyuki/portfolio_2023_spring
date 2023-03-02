<header>
	<a href="/">
		<h1 class="text-center">うすゆきどっとねっと</h1>
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
header > div {
	width: 100%;
	max-width: var(--main-max-width);
}
@keyframes typing { from { width: 0; } }
@keyframes caret { 50% { border-color: var(--black); } }
@keyframes fadeout { 50% { border-right: 0; } }

h1 {
	width:10em;
	border-right: .08em solid;
	border-color: transparent;
	overflow: hidden;
	white-space: nowrap;
	animation: typing 3s steps(10, end), caret .5s step-end 10;
}

</style>
