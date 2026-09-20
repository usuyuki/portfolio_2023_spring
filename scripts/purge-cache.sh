#!/usr/bin/env bash
# NotionのKVキャッシュを削除する。
# data_source_idの解決結果やクエリ結果が古い/壊れた状態で残ってしまった場合に、
# TTL(最大7日)の満了を待たずに手動で捨てるために使う。
#
# 使い方:
#   ./scripts/purge-cache.sh                      # 本番の notion:* を全削除
#   ./scripts/purge-cache.sh --local              # ローカル(wrangler dev)の notion:* を全削除
#   ./scripts/purge-cache.sh --prefix notion:datasource:   # プレフィックスを絞って削除
#   ./scripts/purge-cache.sh --dry-run            # 消さずに対象キーだけ表示
#
# 事前に `wrangler login` が必要(本番を対象にする場合)。
set -euo pipefail

cd "$(dirname "$0")/.."

# アクセスカウンターはキャッシュではなく実データなので、誤って消さないようデフォルトのプレフィックスで除外する
PREFIX="notion:"
TARGET="--remote"
TARGET_LABEL="本番"
DRY_RUN=0
# wrangler.tomlのKVバインディングはidとpreview_idの両方を持つため、
# どちらの名前空間を触るかを明示しないとwranglerがエラーになる。常に本番側(preview以外)を対象にする
PREVIEW_FLAG=(--preview false)

while [[ $# -gt 0 ]]; do
	case "$1" in
	--prefix)
		PREFIX="${2:?--prefix には値が必要です}"
		shift 2
		;;
	--local)
		TARGET="--local"
		TARGET_LABEL="ローカル"
		shift
		;;
	--dry-run)
		DRY_RUN=1
		shift
		;;
	-h | --help)
		sed -n '2,12p' "$0"
		exit 0
		;;
	*)
		echo "不明な引数: $1 (--help で使い方を表示)" >&2
		exit 1
		;;
	esac
done

if [[ ! -f wrangler.toml ]]; then
	echo "wrangler.toml がありません。cp wrangler.toml.example wrangler.toml で作成してください。" >&2
	exit 1
fi

echo "対象: ${TARGET_LABEL} / プレフィックス: ${PREFIX}"

# 一時ファイルは必ず後始末する
KEYS_JSON="$(mktemp)"
trap 'rm -f "$KEYS_JSON"' EXIT

npx wrangler kv key list --binding KV --prefix "$PREFIX" "${PREVIEW_FLAG[@]}" $TARGET >"$KEYS_JSON"

# wrangler kv bulk delete はキー名のみのJSON配列を受け取るため、name だけを抜き出す
COUNT="$(node -e '
const fs = require("fs");
const keys = JSON.parse(fs.readFileSync(process.argv[1], "utf8")).map((k) => k.name);
fs.writeFileSync(process.argv[1], JSON.stringify(keys));
console.log(keys.length);
' "$KEYS_JSON")"

if [[ "$COUNT" -eq 0 ]]; then
	echo "削除対象のキーはありませんでした。"
	exit 0
fi

echo "対象キー ${COUNT} 件:"
node -e 'JSON.parse(require("fs").readFileSync(process.argv[1],"utf8")).forEach((k)=>console.log("  "+k));' "$KEYS_JSON"

if [[ "$DRY_RUN" -eq 1 ]]; then
	echo "--dry-run のため削除しませんでした。"
	exit 0
fi

npx wrangler kv bulk delete "$KEYS_JSON" --binding KV "${PREVIEW_FLAG[@]}" $TARGET --force

echo "${COUNT} 件のキャッシュを削除しました。次回アクセス時にNotionから再取得されます。"
