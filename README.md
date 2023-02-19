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

単体テスト

```
pnpm test:unit
```

コンポーネントテスト

```
pnpm test:ct
```

E2E テスト

```
pnpm test:e2e
```

### Lint

```
pnpm lint
```

```
pnpm format
```
