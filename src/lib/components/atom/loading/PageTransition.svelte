<script lang="ts">
	import { fade } from "svelte/transition";
</script>

<div
	class="fixed inset-0 z-[1002] flex justify-center items-center px-6"
	transition:fade|global={{ duration: 200 }}
>
	<div
		style="max-width:84vw"
		class="box flex flex-col items-center gap-3 px-8 py-7 text-center bg-white"
	>
		<div
			class="w-8 h-8 rounded-full border-4 animate-spin border-yellow border-t-transparent"
		></div>
		<p class="text-xl">
			がんばってページを<br class="md:hidden" />ビルドしています🏗<br />ちょっとまってね🙇
		</p>
		<p class="text-xs opacity-60">
			サーバーレスに無理言ってSSRしてもらっているため、<br
				class="hidden md:block"
			/>ページ遷移まで時間を要することがあります
		</p>
	</div>
</div>
