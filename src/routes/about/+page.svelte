<script lang="ts">
	import NormalHead from "$lib/components/atom/head/NormalHead.svelte";
	import NormalPageTitle from "$lib/components/atom/text/sentence/NormalPageTitle.svelte";
	import QaList from "$lib/components/molecule/qaWindow/QaList.svelte";
	import { pressEasing } from "$lib/utils/actions/pressEasing";
	import type { PageData } from "./$types";
	export let data: PageData;
</script>

<NormalHead title="あばうと" description="うすゆきについて" />
<NormalPageTitle title="あばうと" tag="ABOUT" />

<div class="flex flex-wrap justify-center gap-4 mt-6 mb-16">
	<a href="/kokosuki" use:pressEasing class="box btn-rpg bg-pink">ここすきポイント</a>
	<a href="/history" use:pressEasing class="box btn-rpg bg-blue">経歴</a>
	<a href="/techStack" use:pressEasing class="box btn-rpg bg-black text-white">技術スタック</a>
</div>

<QaList items={data.data} labelColorVariable="black" />
