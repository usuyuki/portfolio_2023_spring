<script lang="ts">
export const bgColorVariable = "pink";
export const textColorVariable = "black";
export const title = "ボタン名";
export const url = "/link";
export const className = "";
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
