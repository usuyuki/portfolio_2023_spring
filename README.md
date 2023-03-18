# portfolio_2023_spring
うすゆきどっとねっと、いわゆるポートフォリオです。

https://usuyuki.net

SvelteKitで作って、Cloudflare WorkersでSSRしています。

## CI
[![PR自動ラベル付与](https://github.com/usuyuki/portfolio_2023_spring/actions/workflows/label.yml/badge.svg)](https://github.com/usuyuki/portfolio_2023_spring/actions/workflows/label.yml)

### コード解析
[![凛としたLint](https://github.com/usuyuki/portfolio_2023_spring/actions/workflows/lint.yml/badge.svg)](https://github.com/usuyuki/portfolio_2023_spring/actions/workflows/lint.yml) 
[![静的解析 (svelte-check)](https://github.com/usuyuki/portfolio_2023_spring/actions/workflows/staticAnalysis.yml/badge.svg)](https://github.com/usuyuki/portfolio_2023_spring/actions/workflows/staticAnalysis.yml)

### テスト
[![単体テスト (vitest)](https://github.com/usuyuki/portfolio_2023_spring/actions/workflows/testUnit.yml/badge.svg)](https://github.com/usuyuki/portfolio_2023_spring/actions/workflows/testUnit.yml) 
[![結合(コンポーネント)テスト (playwright)](https://github.com/usuyuki/portfolio_2023_spring/actions/workflows/testCombination.yml/badge.svg)](https://github.com/usuyuki/portfolio_2023_spring/actions/workflows/testCombination.yml) 
[![統合(E2E)テスト (playwright)](https://github.com/usuyuki/portfolio_2023_spring/actions/workflows/testIntegration.yml/badge.svg)](https://github.com/usuyuki/portfolio_2023_spring/actions/workflows/testIntegration.yml)

## CD

[![Cloudflare Workersへの自動デプロイ](https://github.com/usuyuki/portfolio_2023_spring/actions/workflows/deploy.yml/badge.svg)](https://github.com/usuyuki/portfolio_2023_spring/actions/workflows/deploy.yml)
