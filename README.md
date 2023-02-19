# portfolio_2023_spring
 
うすゆきラップトップのスペックの都合によりDockerの利用はしていません。


## Developer
### 構築
```
pnpm install
```
E2Eテスト必要な時
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

E2Eテスト
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
