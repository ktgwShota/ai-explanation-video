import SignInForm from "@/components/auth/SignInForm";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const runtime = "edge";

// エラー発生時のUIを共通化するためのコンポーネント
const ErrorCard = ({ title, message }: { title: string, message: string }) => (
  <div className="relative overflow-hidden rounded-2xl border border-red-200 bg-white/80 p-8 shadow-2xl backdrop-blur-sm dark:border-red-800 dark:bg-gray-900/80">
    <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-red-100/50 dark:from-red-900/20 dark:to-red-800/20"></div>
    <div className="relative text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
        <svg className="h-8 w-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-red-700 dark:text-red-400">
        {title}
      </h2>
      <p className="mt-3 text-sm text-red-600 dark:text-red-300">
        {message}
      </p>
      <p className="mt-4 text-xs text-red-500/70 dark:text-red-400/70">
        時間をおいて再度お試しいただくか、管理者にお問い合わせください。
      </p>
    </div>
  </div>
);

// ページ全体のレイアウトを定義するラッパー
const SignInPageLayout = ({ children }: { children: React.ReactNode }) => (
  <main className="relative w-full min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    {/* 背景装飾 */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-400/10 to-blue-400/10 blur-2xl"></div>
    </div>
    
    <div className="relative flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  </main>
);

export default async function SignIn() {
  try {
    const supabase = createServerComponentClient({ cookies });
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    // セッションが存在すればトップページにリダイレクト
    if (session) {
      redirect("/");
    }

    // セッション取得時にエラーが発生した場合
    if (error) {
      console.error("セッション取得中にエラーが発生しました:", error.message);
      return (
        <SignInPageLayout>
          <ErrorCard title="エラーが発生しました" message={error.message} />
        </SignInPageLayout>
      );
    }

    // 通常のログインフォーム表示
    return (
      <SignInPageLayout>
        <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/70 p-8 shadow-2xl backdrop-blur-xl dark:border-gray-700/50 dark:bg-gray-900/70">
          {/* カード内の装飾 */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30"></div>
          <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-2xl"></div>
          <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 blur-2xl"></div>
          
          <div className="relative">
            {/* ヘッダー部分 */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
                ログイン
              </h2>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                アカウントにアクセスして、サービスをご利用ください
              </p>
            </div>
            
            {/* フォーム */}
            <SignInForm />
            
            {/* フッター */}
            {/* <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                アカウントをお持ちでない方は
                <a href="/auth/signup" className="ml-1 font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                  新規登録
                </a>
                してください
              </p>
            </div> */}
          </div>
        </div>
      </SignInPageLayout>
    );

  } catch (e) {
    // 予期せぬサーバーエラーが発生した場合
    const errorMessage = e instanceof Error ? e.message : "不明なエラーが発生しました。";
    console.error("ログインページで予期せぬエラーが発生しました:", errorMessage);
    return (
      <SignInPageLayout>
        <ErrorCard
          title="予期せぬエラー"
          message="ページの読み込み中に問題が発生しました。"
        />
      </SignInPageLayout>
    );
  }
}