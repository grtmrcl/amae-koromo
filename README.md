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

## デプロイ

`master` ブランチへのプッシュで GitHub Actions が自動的にEC2へデプロイします。

必要なシークレット（リポジトリのSettings > Secrets and variables > Actions）:

| シークレット名 | 説明 |
|--------------|------|
| `EC2_HOST` | EC2のIPまたはドメイン |
| `EC2_USER` | SSHユーザー名 |
| `EC2_SSH_KEY` | SSH秘密鍵 |

## ローカル開発

```bash
npm install --legacy-peer-deps
npm start
```
