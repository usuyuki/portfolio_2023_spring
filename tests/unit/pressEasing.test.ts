import gsap from "gsap";
import { describe, expect, it } from "vitest";
import { pressEasing } from "$lib/utils/actions/pressEasing";

// pointerType未指定のEventだとpressEasing側のisHoverCapable判定に引っかからないため、マウス操作を模したPointerEventを都度生成する
const mousePointerEvent = (type: string) =>
	new PointerEvent(type, { pointerType: "mouse" });

const setupNode = () => {
	const node = document.createElement("button");
	document.body.appendChild(node);
	return node;
};

describe("pressEasing", () => {
	const cases: {
		name: string;
		dispatch: (node: HTMLElement) => void;
		expectedScale: number;
	}[] = [
		{
			name: "正常系: pointerenter(マウス)するとscaleが1.06(拡大)へ向かうtweenが要素に登録される",
			dispatch: (node) => {
				node.dispatchEvent(mousePointerEvent("pointerenter"));
			},
			expectedScale: 1.06,
		},
		{
			name: "正常系: ホバー中にpointerdownするとscaleが0.86(スナップ縮小)へ向かうtweenが要素に登録される",
			dispatch: (node) => {
				node.dispatchEvent(mousePointerEvent("pointerenter"));
				node.dispatchEvent(mousePointerEvent("pointerdown"));
			},
			expectedScale: 0.86,
		},
		{
			name: "正常系: ホバー中にpointerupするとscaleがホバー値1.06へ戻るtweenが登録される(離脱していないため等倍には戻らない)",
			dispatch: (node) => {
				node.dispatchEvent(mousePointerEvent("pointerenter"));
				node.dispatchEvent(mousePointerEvent("pointerdown"));
				node.dispatchEvent(mousePointerEvent("pointerup"));
			},
			expectedScale: 1.06,
		},
		{
			name: "正常系: pointerleaveするとscaleが1(等倍)へ戻るtweenが要素に登録される",
			dispatch: (node) => {
				node.dispatchEvent(mousePointerEvent("pointerenter"));
				node.dispatchEvent(mousePointerEvent("pointerleave"));
			},
			expectedScale: 1,
		},
		{
			name: "正常系: タッチ操作(pointerType!=='mouse')でpointerdown→pointerupするとホバー扱いされずscaleが1(等倍)へ戻るtweenが登録される",
			dispatch: (node) => {
				node.dispatchEvent(
					new PointerEvent("pointerenter", { pointerType: "touch" }),
				);
				node.dispatchEvent(
					new PointerEvent("pointerdown", { pointerType: "touch" }),
				);
				node.dispatchEvent(
					new PointerEvent("pointerup", { pointerType: "touch" }),
				);
			},
			expectedScale: 1,
		},
	];

	it.each(cases)("$name", ({ dispatch, expectedScale }) => {
		const node = setupNode();
		pressEasing(node);

		dispatch(node);

		// overwrite:"auto"は競合プロパティのみ上書きするため、getTweensOfには過去のtweenも残る。直近に登録されたものを見る
		const tweens = gsap.getTweensOf(node);
		const tween = tweens[tweens.length - 1];
		expect(tween).toBeDefined();
		expect(tween.vars.scale).toBe(expectedScale);
	});

	it("正常系: destroy()を呼ぶとイベントリスナーが解除され、以後pointerenterしてもtweenが生成されない", () => {
		const node = setupNode();
		const { destroy } = pressEasing(node);

		destroy();
		node.dispatchEvent(mousePointerEvent("pointerenter"));

		expect(gsap.getTweensOf(node).length).toBe(0);
	});

	const pointerDownEffectCases: {
		name: string;
		check: (node: HTMLElement) => void;
	}[] = [
		{
			name: "正常系: pointerdownするとrotateが-3か+3のいずれかへ向かうtween(ランダムな傾き)が要素に登録される",
			check: (node) => {
				const tweens = gsap.getTweensOf(node);
				const tween = tweens[tweens.length - 1];
				expect(tween).toBeDefined();
				expect([-3, 3]).toContain(tween.vars.rotate);
			},
		},
		{
			name: "正常系: pointerdownするとis-pressedクラスが付与される",
			check: (node) => {
				expect(node.classList.contains("is-pressed")).toBe(true);
			},
		},
		{
			name: "正常系: pointerdownすると要素内にスラッシュフラッシュ用の子要素(span)が1つ生成される",
			check: (node) => {
				expect(node.querySelectorAll("span").length).toBe(1);
			},
		},
	];

	it.each(pointerDownEffectCases)("$name", ({ check }) => {
		const node = setupNode();
		pressEasing(node);

		node.dispatchEvent(mousePointerEvent("pointerdown"));

		check(node);
	});

	it("正常系: pointerupするとis-pressedクラスが解除される", () => {
		const node = setupNode();
		pressEasing(node);

		node.dispatchEvent(mousePointerEvent("pointerdown"));
		node.dispatchEvent(mousePointerEvent("pointerup"));

		expect(node.classList.contains("is-pressed")).toBe(false);
	});

	it("正常系: pointerdownを連打してもスラッシュフラッシュ用の子要素(span)は重複生成されない", () => {
		const node = setupNode();
		pressEasing(node);

		node.dispatchEvent(mousePointerEvent("pointerdown"));
		node.dispatchEvent(mousePointerEvent("pointerdown"));
		node.dispatchEvent(mousePointerEvent("pointerdown"));

		expect(node.querySelectorAll("span").length).toBe(1);
	});

	it("正常系: マウスでホバーした後にタッチでpointerdown→pointerupすると、ホバー状態が残っておりtoHover()相当のscale1.06に固着せずscaleが1(等倍)へ戻るtweenが登録される", () => {
		const node = setupNode();
		pressEasing(node);

		node.dispatchEvent(mousePointerEvent("pointerenter"));
		node.dispatchEvent(
			new PointerEvent("pointerdown", { pointerType: "touch" }),
		);
		node.dispatchEvent(new PointerEvent("pointerup", { pointerType: "touch" }));

		const tweens = gsap.getTweensOf(node);
		const tween = tweens[tweens.length - 1];
		expect(tween).toBeDefined();
		expect(tween.vars.scale).toBe(1);
	});

	it("正常系: タッチでpointerdown後にpointercancelが発火すると、以前はtoNormal()が呼ばれず縮小(scale0.86)したまま固着していたが、修正後はscaleが1(等倍)へ戻るtweenが登録される", () => {
		const node = setupNode();
		pressEasing(node);

		node.dispatchEvent(
			new PointerEvent("pointerdown", { pointerType: "touch" }),
		);
		node.dispatchEvent(
			new PointerEvent("pointercancel", { pointerType: "touch" }),
		);

		const tweens = gsap.getTweensOf(node);
		const tween = tweens[tweens.length - 1];
		expect(tween).toBeDefined();
		expect(tween.vars.scale).toBe(1);
	});

	it("正常系: タッチでpointerdown後にpointercancelが発火すると、is-pressedクラスが解除される", () => {
		const node = setupNode();
		pressEasing(node);

		node.dispatchEvent(
			new PointerEvent("pointerdown", { pointerType: "touch" }),
		);
		node.dispatchEvent(
			new PointerEvent("pointercancel", { pointerType: "touch" }),
		);

		expect(node.classList.contains("is-pressed")).toBe(false);
	});

	it("正常系: destroy()を呼ぶと、pointerdown直後に生成された進行中のスラッシュ用span要素も打ち切られてDOMから除去される", () => {
		const node = setupNode();
		const { destroy } = pressEasing(node);

		node.dispatchEvent(mousePointerEvent("pointerdown"));
		expect(node.querySelectorAll("span").length).toBe(1);

		destroy();

		expect(node.querySelectorAll("span").length).toBe(0);
	});
});
