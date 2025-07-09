# 🧠 AI Word Quiz App

AIを活用して英語やドイツ語の語彙力を高めるクイズアプリです。  
クイズの生成にはOpenAI APIを使用し、ユーザー認証・単語の保存にはSupabase、決済にはStripeを活用したフルスタックアプリです。

---

## 🚀 Features

- ✨ **AIによるクイズ生成**（OpenAI API GPT-4対応）
- 📚 **英語 / ドイツ語対応、レベル選択可能（初級〜上級）**
- ✅ **4択形式のクイズ / 自動的に1問ずつ表示**
- 🔐 **Supabaseによるユーザー認証**
- 📌 **間違えた単語のみSupabaseに保存**
- 💳 **Stripe対応のプロフィール機能**
- 📱 **レスポンシブデザイン（Tailwind CSS）**

---

## 🛠️ Built With

| 技術         | 説明 |
|--------------|------|
| **Next.js 15 App Router** | 最新のルーティング構造 |
| **React / TypeScript** | 型安全なUI構築 |
| **Tailwind CSS** | 高速スタイリング |
| **Supabase** | Auth + DB + Storage |
| **OpenAI API** | GPT-4でクイズ自動生成 |
| **Stripe** | 決済・課金対応用プロフィール構築 |

---

## ⚙️ Getting Started

### 1. 環境変数を設定

`.env.local` を作成して以下を記述：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
