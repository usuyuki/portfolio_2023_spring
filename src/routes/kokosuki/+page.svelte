<script lang="ts">
	import NormalHead from "#lib/components/atom/head/NormalHead.svelte";
	import NormalPageTitle from "#lib/components/atom/text/sentence/NormalPageTitle.svelte";
	import QaList from "#lib/components/molecule/qaWindow/QaList.svelte";
	import type { PageProps } from "./$types";
	let { data }: PageProps = $props();
</script>

<NormalHead title="ここすき" description="すきなものを表現するページ" />
<NormalPageTitle title="ここすき" tag="KOKOSUKI" />

<QaList items={data.data} labelColorVariable="pink" />
