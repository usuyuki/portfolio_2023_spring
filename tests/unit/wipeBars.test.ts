import gsap from "gsap";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
	coverWithBars,
	revealFromBars,
	WIPE_BARS_OFFSCREEN_X,
} from "$lib/utils/actions/wipeBars";

const setupBars = (count: number) =>
	Array.from({ length: count }, () => {
		const el = document.createElement("div");
		document.body.appendChild(el);
		return el;
	});

describe("coverWithBars", () => {
	afterEach(() => {
		gsap.killTweensOf("*");
	});

	const cases: {
		name: string;
		barCount: number;
	}[] = [
		{
			name: "正常系: 帯が1本の場合でもx:0vwへ向かうtweenが登録される",
			barCount: 1,
		},
		{
			name: "正常系: 帯が3本(backdrop+bar1+bar2相当)の場合も全帯にx:0vwへ向かうtweenが登録される",
			barCount: 3,
		},
	];

	it.each(cases)("$name", ({ barCount }) => {
		const bars = setupBars(barCount);

		coverWithBars(bars);

		for (const bar of bars) {
			const tween = gsap.getTweensOf(bar)[0];
			expect(tween).toBeDefined();
			expect(tween.vars.x).toBe("0vw");
		}
	});

	it("正常系: 帯を覆い終える(onComplete)とコールバックが呼ばれる", () => {
		const bars = setupBars(1);
		const onCovered = vi.fn();

		coverWithBars(bars, onCovered);

		const tween = gsap.getTweensOf(bars[0])[0];
		tween.vars.onComplete?.();

		expect(onCovered).toHaveBeenCalledOnce();
	});

	it("異常系: 空配列を渡すとクラッシュせず、tween対象が無いためonCompleteコールバックも呼ばれない", () => {
		const onCovered = vi.fn();

		expect(() => coverWithBars([], onCovered)).not.toThrow();
		expect(onCovered).not.toHaveBeenCalled();
	});
});

describe("revealFromBars", () => {
	afterEach(() => {
		gsap.killTweensOf("*");
	});

	it("正常系: 帯が画面外左(-160vw)へ向かうtweenが登録される", () => {
		const bars = setupBars(2);

		revealFromBars(bars);

		for (const bar of bars) {
			const tween = gsap.getTweensOf(bar)[0];
			expect(tween).toBeDefined();
			expect(tween.vars.x).toBe(`-${WIPE_BARS_OFFSCREEN_X}`);
		}
	});

	it("正常系: 退場アニメーション完了後、次回に備えて帯が右端(画面外)へgsap.setでリセットされコールバックが呼ばれる", () => {
		const bars = setupBars(1);
		const onRevealed = vi.fn();

		revealFromBars(bars, onRevealed);

		const tween = gsap.getTweensOf(bars[0])[0];
		tween.vars.onComplete?.();

		expect(onRevealed).toHaveBeenCalledOnce();
		// gsap.set(bars, { x: WIPE_BARS_OFFSCREEN_X })が即座にtransformへ反映されていることを確認する(getPropertyは単位なしの数値を返す)
		expect(gsap.getProperty(bars[0], "x")).toBe(
			Number.parseFloat(WIPE_BARS_OFFSCREEN_X),
		);
	});

	it("異常系: 空配列を渡してもエラーにならない", () => {
		expect(() => revealFromBars([])).not.toThrow();
	});
});
