# 開発向け

## 構築

```
pnpm install
```
E2E テスト必要な時

```
npx playwright install
```

手元でCloudflare workersを動かす場合
```
cp wrangler.toml.example wrangler.toml
```

## 起動

```
pnpm dev
```

Cloudflare Workers込の開発環境
```
pnpm wrangler dev
```
##  Cloudflare関連
kv作る
```
pnpm wrangler kv:namespace create "kv" --preview
pnpm wrangler kv:namespace create "kv"
```

本番のログをtailする
```
pnpm wrangler tail usuyuki-portfolio-v6
```

本番push
```
pnpm wrangler publish
```
--configオプションは存在するが効かないので、CI向けのwrangler.tomlを書き換える

dry run
```
pnpm wrangler publish --config --dry-run 
```


### テスト
テストはソフトウェアのテスト技法に基づき
- 単体テスト：Vitest
- 結合(コンポーネント)テスト：Playwright
- 統合(E2E)テスト：Playwright

で行っている


単体テスト

```
pnpm test:u
```

結合テスト

```
pnpm test:c
```

統合テスト

```
pnpm test:i
```

#### テストの追加

playwrightでクリックのテストを追加したいとき
```
npx playwright codegen http://localhost:5173/
```
で出てきたブラウザで操作をするとコードが生成できる

```
npx playwright show-report
```
### Lint

```
pnpm lint
```

```
pnpm format
```
