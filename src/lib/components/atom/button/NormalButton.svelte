<script lang="ts">
	import { pressEasing } from "$lib/utils/actions/pressEasing";

	export let bgColorVariable: "pink" | "black" | "yellow" | "blue" = "pink";
	export let textColorVariable: "black" | "blue" = "black";
	export let title: string = "ボタン名";
	export let url: string = "/link";
	export let className: string = "";
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
