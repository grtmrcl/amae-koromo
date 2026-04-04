# amae-koromo

DBに格納した雀魂のデータを解析して表示するWebアプリケーション。

## アーキテクチャ

React SPAをDockerコンテナ上のnginxで配信する。

## Docker

### ビルド & 起動

```bash
docker compose up -d
```

ポート80でアクセス可能。

### ビルドのみ

```bash
docker compose build
```

## ローカル開発

```bash
npm install --legacy-peer-deps
npm start
```
