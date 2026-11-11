// トップページのアクセスカウンタ(Cloudflare Workers KVのcounterキー)の読み書き

// アクセスカウンタで使うKVの操作だけを抜き出した型(テストで差し替えやすくするため)
interface CounterKV {
	get(key: string): Promise<string | null>;
	put(key: string, value: string): Promise<void>;
}

export const COUNTER_KEY = "counter";

// KVが使えない(バインディング未設定・読み取り失敗)ときに表示する値。
// 「0」だと本当に誰も来ていないように見えるため、キリ番風のダミー値を出す
export const COUNTER_UNAVAILABLE_VALUE = "7777";

/**
 * KVに保存されたカウンタの値を0以上の整数に変換する。
 * 未作成(null)や、手で書き換えられた不正な値("NaN"・負数・小数など)は0として扱い、
 * 不正な値がそのまま加算・保存され続けるのを防ぐ
 */
export function parseCounterValue(value: string | null): number {
	if (value === null || !/^\d+$/.test(value)) return 0;
	return Number(value);
}

/**
 * 表示用にカウンタの値を読む。
 * カウンタはページの飾りなので、KVが無い・読み取りに失敗した場合もページ全体を落とさず代替値を返す
 */
export async function readAccessCounter(kv?: CounterKV): Promise<string> {
	if (!kv) return COUNTER_UNAVAILABLE_VALUE;
	try {
		return String(parseCounterValue(await kv.get(COUNTER_KEY)));
	} catch (error) {
		console.warn("アクセスカウンタの読み取りに失敗しました:", error);
		return COUNTER_UNAVAILABLE_VALUE;
	}
}

/**
 * カウンタを1増やして保存し、増やした後の値を返す。カウントできなかった場合はnullを返す。
 *
 * KVにはアトミックな加算が無いため、読み取りと書き込みの間に別のリクエストが入ると1件分数え漏れる。
 * 厳密に数えるにはDurable Objectsが必要になるが、個人サイトの飾りのカウンタには過剰なので、
 * 同時アクセス時の数え漏れは許容している
 */
export async function incrementAccessCounter(
	kv?: CounterKV,
): Promise<number | null> {
	if (!kv) return null;
	try {
		const next = parseCounterValue(await kv.get(COUNTER_KEY)) + 1;
		await kv.put(COUNTER_KEY, String(next));
		return next;
	} catch (error) {
		console.warn("アクセスカウンタの更新に失敗しました:", error);
		return null;
	}
}
