import gsap from "gsap";
import { describe, expect, it } from "vitest";
import { pressEasing } from "$lib/utils/actions/pressEasing";

describe("pressEasing", () => {
	it("正常系: pointerenterするとscaleが1.08(拡大)へ向かうtweenが要素に登録される", () => {
		const node = document.createElement("button");
		document.body.appendChild(node);
		pressEasing(node);

		node.dispatchEvent(new Event("pointerenter"));

		const tween = gsap.getTweensOf(node)[0];
		expect(tween).toBeDefined();
		expect(tween.vars.scale).toBe(1.08);
	});

	it("正常系: ホバー中にpointerdownするとscaleが0.92(縮小)へ向かうtweenが要素に登録される", () => {
		const node = document.createElement("button");
		document.body.appendChild(node);
		pressEasing(node);

		node.dispatchEvent(new Event("pointerenter"));
		node.dispatchEvent(new Event("pointerdown"));

		const tween = gsap.getTweensOf(node)[0];
		expect(tween).toBeDefined();
		expect(tween.vars.scale).toBe(0.92);
	});

	it("正常系: ホバー中にpointerupするとscaleがホバー値1.08へ戻るtweenが登録される(離脱していないため等倍には戻らない)", () => {
		const node = document.createElement("button");
		document.body.appendChild(node);
		pressEasing(node);

		node.dispatchEvent(new Event("pointerenter"));
		node.dispatchEvent(new Event("pointerdown"));
		node.dispatchEvent(new Event("pointerup"));

		const tween = gsap.getTweensOf(node)[0];
		expect(tween).toBeDefined();
		expect(tween.vars.scale).toBe(1.08);
	});

	it("正常系: pointerleaveするとscaleが1(等倍)へ戻るtweenが要素に登録される", () => {
		const node = document.createElement("button");
		document.body.appendChild(node);
		pressEasing(node);

		node.dispatchEvent(new Event("pointerenter"));
		node.dispatchEvent(new Event("pointerleave"));

		const tween = gsap.getTweensOf(node)[0];
		expect(tween).toBeDefined();
		expect(tween.vars.scale).toBe(1);
	});

	it("異常系: destroy()を呼ぶとイベントリスナーが解除され、以後pointerenterしてもtweenが生成されない", () => {
		const node = document.createElement("button");
		document.body.appendChild(node);
		const { destroy } = pressEasing(node);

		destroy();
		node.dispatchEvent(new Event("pointerenter"));

		expect(gsap.getTweensOf(node).length).toBe(0);
	});
});
