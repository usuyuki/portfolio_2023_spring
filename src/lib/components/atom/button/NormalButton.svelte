<script lang="ts">
	import { pressEasing } from "#lib/utils/actions/pressEasing.ts";

	interface Props {
		bgColorVariable?: "pink" | "black" | "yellow" | "blue";
		textColorVariable?: "black" | "blue";
		title?: string;
		url?: string;
		className?: string;
	}

	let {
		bgColorVariable = "pink",
		textColorVariable = "black",
		title = "ボタン名",
		url = "/link",
		className = "",
	}: Props = $props();
</script>

<!-- bg-変数名 のように指定すると、Tailwindのバンドル時に対象外になってしまう危険があるが、他で絶対使うのでこの指定を許している -->
<div class={`flex items-center justify-center ${className}`}>
	<a href={url}>
		<div
			use:pressEasing
			class="btn-rpg bg-{bgColorVariable} text-{textColorVariable}"
		>
			<p>{title}</p>
		</div>
	</a>
</div>
