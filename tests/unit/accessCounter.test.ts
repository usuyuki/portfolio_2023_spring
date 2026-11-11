import { describe, expect, it, vi } from "vitest";
import {
	COUNTER_KEY,
	COUNTER_UNAVAILABLE_VALUE,
	incrementAccessCounter,
	parseCounterValue,
	readAccessCounter,
} from "#lib/utils/usecase/accessCounter.ts";

// getの結果とputの記録だけを持つ、テスト用の最小KV
function createKV(stored: string | null, options?: { failGet?: boolean }) {
	return {
		get: vi.fn(async () => {
			if (options?.failGet) throw new Error("KV read limit exceeded");
			return stored;
		}),
		put: vi.fn(async () => {}),
	};
}

describe("parseCounterValue", () => {
	it.each([
		{
			name: "正常系: 数値文字列はそのまま数値になる",
			input: "123",
			expected: 123,
		},
		{ name: "正常系: 0はそのまま0になる", input: "0", expected: 0 },
		// counterキーが未作成のKVはnullを返す
		{
			name: "異常系: nullを渡すと未作成扱いなので0になる",
			input: null,
			expected: 0,
		},
		// 手作業でKVを書き換えた場合などに起こりうる
		{
			name: "異常系: 数値でない文字列を渡すとNaNにせず0になる",
			input: "abc",
			expected: 0,
		},
		{
			name: '異常系: 保存済みの"NaN"を渡すと0に復帰する',
			input: "NaN",
			expected: 0,
		},
		{
			name: "異常系: 負数を渡すとカウンタとして不正なので0になる",
			input: "-5",
			expected: 0,
		},
		{
			name: "異常系: 小数を渡すとカウンタとして不正なので0になる",
			input: "1.5",
			expected: 0,
		},
		{ name: "異常系: 空文字列を渡すと0になる", input: "", expected: 0 },
	])("$name", ({ input, expected }) => {
		expect(parseCounterValue(input)).toBe(expected);
	});
});

describe("readAccessCounter", () => {
	it.each([
		{
			name: "正常系: KVに保存された値を文字列で返す",
			kv: createKV("42"),
			expected: "42",
		},
		{
			name: "異常系: counterキーが未作成なら0を返す",
			kv: createKV(null),
			expected: "0",
		},
		{
			name: "異常系: 値が数値でなければ0を返す",
			kv: createKV("NaN"),
			expected: "0",
		},
		{
			name: "異常系: KVバインディングが無いとページを落とさず代替値を返す",
			kv: undefined,
			expected: COUNTER_UNAVAILABLE_VALUE,
		},
		{
			name: "異常系: KVの読み取りが失敗するとページを落とさず代替値を返す",
			kv: createKV("42", { failGet: true }),
			expected: COUNTER_UNAVAILABLE_VALUE,
		},
	])("$name", async ({ kv, expected }) => {
		await expect(readAccessCounter(kv)).resolves.toBe(expected);
	});
});

describe("incrementAccessCounter", () => {
	it.each([
		{
			name: "正常系: 保存済みの値に1を足して書き込む",
			stored: "41",
			expected: 42,
		},
		{
			name: "異常系: counterキーが未作成なら1から数え始める",
			stored: null,
			expected: 1,
		},
		{
			name: '異常系: 保存値がNaNなら"NaN"を書き戻さず1から数え直す',
			stored: "NaN",
			expected: 1,
		},
	])("$name", async ({ stored, expected }) => {
		const kv = createKV(stored);
		await expect(incrementAccessCounter(kv)).resolves.toBe(expected);
		expect(kv.put).toHaveBeenCalledWith(COUNTER_KEY, String(expected));
	});

	it("異常系: KVバインディングが無いとカウントできないのでnullを返す", async () => {
		await expect(incrementAccessCounter(undefined)).resolves.toBeNull();
	});

	it("異常系: KVの読み取りが失敗するとカウントできないのでnullを返し、書き込みもしない", async () => {
		const kv = createKV("41", { failGet: true });
		await expect(incrementAccessCounter(kv)).resolves.toBeNull();
		expect(kv.put).not.toHaveBeenCalled();
	});
});
