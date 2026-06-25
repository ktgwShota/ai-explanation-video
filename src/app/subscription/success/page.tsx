export const runtime = 'edge';

export default function PlanSuccessPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-neutral-900 px-4">
      <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          決済が完了しました！
        </h1>
        <p className="text-gray-700 dark:text-neutral-200 mb-6">
          ありがとうございます。
          <br />
          プランのアップグレードが完了しました。
        </p>
        <a
          href="/auth/dashboard"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition-colors duration-200"
        >
          ダッシュボードへ戻る
        </a>
      </div>
    </main>
  );
}
