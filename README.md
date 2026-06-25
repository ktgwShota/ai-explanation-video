This is a [Next.js](https://nextjs.org/) project bootstrapped with [`c3`](https://developers.cloudflare.com/pages/get-started/c3).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Cloudflare integration

Besides the `dev` script mentioned above `c3` has added a few extra scripts that allow you to integrate the application with the [Cloudflare Pages](https://pages.cloudflare.com/) environment, these are:

- `pages:build` to build the application for Pages using the [`@cloudflare/next-on-pages`](https://github.com/cloudflare/next-on-pages) CLI
- `preview` to locally preview your Pages application using the [Wrangler](https://developers.cloudflare.com/workers/wrangler/) CLI
- `deploy` to deploy your Pages application using the [Wrangler](https://developers.cloudflare.com/workers/wrangler/) CLI

> **Note:** while the `dev` script is optimal for local development you should preview your Pages application as well (periodically or before deployments) in order to make sure that it can properly work in the Pages environment (for more details see the [`@cloudflare/next-on-pages` recommended workflow](https://github.com/cloudflare/next-on-pages/blob/main/internal-packages/next-dev/README.md#recommended-development-workflow))

### Bindings

Cloudflare [Bindings](https://developers.cloudflare.com/pages/functions/bindings/) are what allows you to interact with resources available in the Cloudflare Platform.

You can use bindings during development, when previewing locally your application and of course in the deployed application:

- To use bindings in dev mode you need to define them in the `next.config.js` file under `setupDevBindings`, this mode uses the `next-dev` `@cloudflare/next-on-pages` submodule. For more details see its [documentation](https://github.com/cloudflare/next-on-pages/blob/05b6256/internal-packages/next-dev/README.md).

- To use bindings in the preview mode you need to add them to the `pages:preview` script accordingly to the `wrangler pages dev` command. For more details see its [documentation](https://developers.cloudflare.com/workers/wrangler/commands/#dev-1) or the [Pages Bindings documentation](https://developers.cloudflare.com/pages/functions/bindings/).

- To use bindings in the deployed application you will need to configure them in the Cloudflare [dashboard](https://dash.cloudflare.com/). For more details see the [Pages Bindings documentation](https://developers.cloudflare.com/pages/functions/bindings/).

#### KV Example

`c3` has added for you an example showing how you can use a KV binding.

In order to enable the example:

- Search for javascript/typescript lines containing the following comment:
  ```ts
  // KV Example:
  ```
  and uncomment the commented lines below it (also uncomment the relevant imports).
- In the `wrangler.jsonc` file add the following configuration line:
  ```
  "kv_namespaces": [{ "binding": "MY_KV_NAMESPACE", "id": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" }],
  ```
- If you're using TypeScript run the `cf-typegen` script to update the `env.d.ts` file:
  ```bash
  npm run cf-typegen
  # or
  yarn cf-typegen
  # or
  pnpm cf-typegen
  # or
  bun cf-typegen
  ```

After doing this you can run the `dev` or `preview` script and visit the `/api/hello` route to see the example in action.

Finally, if you also want to see the example work in the deployed application make sure to add a `MY_KV_NAMESPACE` binding to your Pages application in its [dashboard kv bindings settings section](https://dash.cloudflare.com/?to=/:account/pages/view/:pages-project/settings/functions#kv_namespace_bindings_section). After having configured it make sure to re-deploy your application.

## メモ

AWS ApiGateway 12 ヶ月は無料期間がある

tailwind 4 にすると　常に darkmode が常に media になるバグがある
"dev": "next dev --turbopack",にするとエラーが出る

# AI Explanation Video

## データベース操作

### データベースの確認

D1 データベースの一覧を確認：

```bash
wrangler d1 list
```

### テーブルの確認

テーブルの一覧を確認：

```bash
wrangler d1 execute ai-explanation-video --remote --command="SELECT name FROM sqlite_master WHERE type='table';"
```

テーブルの構造を確認：

```bash
wrangler d1 execute ai-explanation-video --remote --command="SELECT sql FROM sqlite_master WHERE type='table' AND name='script';"
```

### データの操作

データの挿入：

```bash
wrangler d1 execute ai-explanation-video --remote --command="INSERT INTO script (keyword, content, version, created_at, updated_at) VALUES ('テストキーワード', 'テストコンテンツ', 1, datetime('now'), datetime('now'));"
```

データの取得：

```bash
wrangler d1 execute ai-explanation-video --remote --command="SELECT * FROM script;"
```

データの更新：

```bash
wrangler d1 execute ai-explanation-video --remote --command="UPDATE script SET content = '更新されたコンテンツ', updated_at = datetime('now') WHERE id = 1;"
```

データの削除：

```bash
wrangler d1 execute ai-explanation-video --remote --command="DELETE FROM script WHERE id = 1;"
```

### テーブルの作成

テーブルを作成：

```bash
wrangler d1 execute ai-explanation-video --remote --command="CREATE TABLE IF NOT EXISTS script (id INTEGER PRIMARY KEY AUTOINCREMENT, keyword TEXT NOT NULL, content TEXT NOT NULL, version INTEGER NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL);"
```

### 注意事項

- `--remote`フラグを付けると本番環境のデータベースにアクセスします
- `--remote`フラグを省略するとローカル開発環境のデータベースにアクセスします
- 本番環境のデータベースを操作する際は注意が必要です

### 環境変数

開発環境（`.dev.vars`）：

```
DB=ai-explanation-video
```

本番環境（Cloudflare Pages）：

- 変数名: `DB`
- 値: `ai-explanation-video`

wrangler pages deployment tail

Next.js の開発サーバーと Cloudflare Pages の開発サーバーを同時に実行する必要がありますね。
以下の 2 つのターミナルで別々に実行してください：
ターミナル 1（Next.js 開発サーバー）:
Apply to route.ts
Run
dev
ターミナル 2（Cloudflare Pages 開発サーバー）:
Apply to route.ts
Run
npx wrangler pages dev --proxy 3000
--proxy 3000 オプションを追加することで：
Next.js の開発サーバー（ポート 3000）にプロキシします
最新のコード変更がリアルタイムで反映されます
D1 データベースのバインディングも利用可能になります
これで、コードの変更が即座に反映され、かつ D1 データベースにもアクセスできるようになります。

DB,認証、決済まわりは supabase
その他は d1database
