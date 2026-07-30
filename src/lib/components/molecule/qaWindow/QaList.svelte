<script lang="ts">
	// RPGのセリフウィンドウ風に「ラベル+説明文」の組を並べる共通コンポーネント。about/kokosukiで共用する
	export let items: { name: string; content: string }[];
	// ラベル側の背景色。about(黒)/kokosuki(pink)で使い分ける
	export let labelColorVariable: "black" | "pink" = "black";
</script>

<div class="qa-list">
	{#each items as item}
		<div class="qa-row">
			<div
				class="qa-q serif"
				class:bg-black={labelColorVariable === "black"}
				class:text-white={labelColorVariable === "black"}
				class:bg-pink={labelColorVariable === "pink"}
			>
				{item.name}
			</div>
			<div class="qa-a">{item.content}</div>
		</div>
	{/each}
</div>

<style>
	.qa-list {
		max-width: 900px;
		margin: 0 auto 90px;
		display: flex;
		flex-direction: column;
		gap: 18px;
		padding: 0 16px;
	}
	.qa-row {
		display: flex;
		align-items: stretch;
	}
	.qa-q {
		flex: 0 0 200px;
		border-radius: 16px 0 0 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 16px;
		font-size: 15px;
		text-align: center;
		border: 4px solid var(--black);
	}
	.qa-a {
		flex: 1;
		background: var(--white);
		border: 4px solid var(--black);
		border-left: none;
		border-radius: 0 16px 16px 0;
		padding: 16px 22px;
		display: flex;
		align-items: center;
		font-size: 15px;
	}
	@media (max-width: 640px) {
		.qa-row {
			flex-direction: column;
		}
		.qa-q {
			border-radius: 16px 16px 0 0;
			border-left: 4px solid var(--black);
			border-bottom: none;
		}
		.qa-a {
			border-radius: 0 0 16px 16px;
			border-left: 4px solid var(--black);
			border-top: none;
		}
	}
</style>
