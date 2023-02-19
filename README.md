# portfolio_2023_spring

うすゆきラップトップのスペックの都合により Docker の利用はしていません。

## Developer

### 構築

```
pnpm install
```

E2E テスト必要な時

```
npx playwright install
```

### 起動

```
pnpm dev
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

### Lint

```
pnpm lint
```

```
pnpm format
```
