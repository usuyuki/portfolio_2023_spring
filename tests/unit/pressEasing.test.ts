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
			name: "正常系: pointerenter(マウス)するとscaleが1.08(拡大)へ向かうtweenが要素に登録される",
			dispatch: (node) => {
				node.dispatchEvent(mousePointerEvent("pointerenter"));
			},
			expectedScale: 1.08,
		},
		{
			name: "正常系: ホバー中にpointerdownするとscaleが0.92(縮小)へ向かうtweenが要素に登録される",
			dispatch: (node) => {
				node.dispatchEvent(mousePointerEvent("pointerenter"));
				node.dispatchEvent(mousePointerEvent("pointerdown"));
			},
			expectedScale: 0.92,
		},
		{
			name: "正常系: ホバー中にpointerupするとscaleがホバー値1.08へ戻るtweenが登録される(離脱していないため等倍には戻らない)",
			dispatch: (node) => {
				node.dispatchEvent(mousePointerEvent("pointerenter"));
				node.dispatchEvent(mousePointerEvent("pointerdown"));
				node.dispatchEvent(mousePointerEvent("pointerup"));
			},
			expectedScale: 1.08,
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

		const tween = gsap.getTweensOf(node)[0];
		expect(tween).toBeDefined();
		expect(tween.vars.scale).toBe(expectedScale);
	});

	it("異常系: destroy()を呼ぶとイベントリスナーが解除され、以後pointerenterしてもtweenが生成されない", () => {
		const node = setupNode();
		const { destroy } = pressEasing(node);

		destroy();
		node.dispatchEvent(mousePointerEvent("pointerenter"));

		expect(gsap.getTweensOf(node).length).toBe(0);
	});
});
