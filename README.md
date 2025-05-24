# 郵便番号検索アプリケーション

このプロジェクトは、郵便番号から住所を検索する Web アプリケーションです。Next.js を使用して実装されており、2 つの異なる実装方法を提供しています。

## 実装バージョン

### 1st Version (Next.js + React)

- Next.js の App Router を使用した実装
- React コンポーネントによる UI 実装
- クライアントサイドでのデータ処理
- Tailwind CSS によるスタイリング

### 3rd Version (Next.js + Web API)

- Next.js の API Routes を使用した実装
- フロントエンドとバックエンドの分離
- RESTful API によるデータ提供
- シンプルな HTML/JavaScript クライアント

## 主な違い

| 機能           | 1st Version        | 3rd Version                  |
| -------------- | ------------------ | ---------------------------- |
| アーキテクチャ | モノリシック       | クライアント・サーバー       |
| データ処理     | クライアントサイド | サーバーサイド               |
| 拡張性         | 限定的             | 高い（API として再利用可能） |
| 実装の複雑さ   | 中程度             | 低（クライアント側）         |
| パフォーマンス | データ量に依存     | サーバーサイドで最適化可能   |

## 作成過程

1. データ変換スクリプトの作成

   - `KEN_ALL.CSV`を JSON 形式に変換
   - Shift-JIS エンコーディングの処理
   - 必要なフィールドの抽出

2. Next.js プロジェクトのセットアップ

   ```bash
   npx create-next-app@latest zipcode-app --typescript --tailwind --eslint
   ```

3. 1st Version の実装

   - `app/page.tsx`にメインコンポーネントを実装
   - クライアントサイドでの検索機能
   - リアルタイムサジェスト機能

4. 3rd Version の実装
   - `app/api/zipcode/route.ts`に API エンドポイントを実装
   - `public/client.html`にシンプルなクライアントを実装
   - デバウンス処理とエラーハンドリング

## 使用方法

### 1. データの準備

```bash
# 依存パッケージのインストール
npm install

# CSVからJSONへの変換
npm run convert
```

### 2. アプリケーションの起動

```bash
# 開発サーバーの起動
npm run dev
```

### 3. アクセス方法

#### 1st Version

- ブラウザで `http://localhost:3000` にアクセス
- Next.js の App Router を使用した実装にアクセス

#### 3rd Version

- ブラウザで `http://localhost:3000/client.html` にアクセス
- シンプルな HTML クライアントにアクセス
- API エンドポイント: `http://localhost:3000/api/zipcode?q=100`

## API 仕様

### エンドポイント

```
GET /api/zipcode?q={query}
```

### パラメータ

- `q`: 検索クエリ（郵便番号の一部、3 文字以上）

### レスポンス

```json
{
  "results": [
    {
      "zipCode": "1000001",
      "prefecture": "東京都",
      "city": "千代田区",
      "street": "千代田"
    }
  ]
}
```

### エラーレスポンス

```json
{
  "error": "エラーメッセージ"
}
```

## 技術スタック

- Next.js 15.3.2
- TypeScript
- Tailwind CSS
- Node.js
- CSV Parser
- Iconv-lite (文字エンコーディング変換)

## 今後の改善点

1. エラーハンドリングの強化
2. パフォーマンスの最適化
3. テストの追加
4. キャッシュ機能の実装
5. セキュリティの強化
6. レスポンシブデザインの改善

## Docker 環境での実行方法

### 1. 環境の準備

```bash
# Dockerイメージのビルド
docker-compose build

# コンテナの起動
docker-compose up
```

### 2. アクセス方法

- ブラウザで `http://localhost:3000` にアクセス
- シンプルな HTML クライアントは `http://localhost:3000/client.html` でアクセス可能

### 3. 開発時の注意点

- ソースコードの変更は自動的にホットリロードされます
- `node_modules`はコンテナ内で管理されます
- コンテナの停止は `docker-compose down` で実行できます
