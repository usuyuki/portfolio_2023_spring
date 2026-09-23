<script lang="ts">
	// loadで必ずredirectかerrorになるので描画されない。+page.server.ts単体のルートは作れないため置いている
	import NormalHead from "$lib/components/atom/head/NormalHead.svelte";
</script>

<NormalHead title="直近のイベント" description="開催日が最も近いイベントへ移動します" />

<p class="text-center text-2xl mt-20">イベントページへ移動しています…</p>
