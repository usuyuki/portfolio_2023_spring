<script lang="ts">
// biome-ignore lint/style/useConst: These are Svelte component props
export let bgColorVariable: "pink" | "black" | "yellow" | "blue" = "pink";
// biome-ignore lint/style/useConst: These are Svelte component props
export let textColorVariable: "black" | "blue" = "black";
// biome-ignore lint/style/useConst: These are Svelte component props
export let title: string = "ボタン名";
// biome-ignore lint/style/useConst: These are Svelte component props
export let url: string = "/link";
// biome-ignore lint/style/useConst: These are Svelte component props
export let className: string = "";
</script>

<!-- bg-変数名 のように指定すると、Tailwindのバンドル時に対象外になってしまう危険があるが、他で絶対使うのでこの指定を許している -->
<div class={`flex items-center justify-center ${className}`}>
	<a href={url}>
		<div
			class="flex rounded-xl bg-{bgColorVariable} px-4 py-3 hover:bg-{textColorVariable} hover:text-{bgColorVariable} text-{textColorVariable} duration-500"
		>
			<p>{title}</p>
		</div>
	</a>
</div>
