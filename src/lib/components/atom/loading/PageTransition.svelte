<script lang="ts">
	import { fly } from "svelte/transition";
</script>

<div
	style="max-width:84vw"
	class="flex fixed left-6 top-12 z-50 justify-center items-center py-2 px-4 bg-black rounded-lg opacity-95 md:left-12"
	transition:fly|global={{ x: -300, duration: 500 }}
>
	<div class="flex justify-center">
		<div
			class="w-8 h-8 rounded-full border-4 animate-spin border-yellow border-t-transparent"
		></div>
	</div>
	<div>
		<p class="pl-2 text-xl text-white">
			がんばってページを<br class="md:hidden" />ビルドしています🏗<br />ちょっとまってね🙇
		</p>
		<p class="pl-4 text-xs text-gray-400">
			サーバーレスに無理言ってSSRしてもらっているため、<br
				class="hidden md:block"
			/>ページ遷移まで時間を要することがあります
		</p>
	</div>
</div>
