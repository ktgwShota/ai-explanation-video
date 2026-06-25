export const runtime = "edge";

export default function About() {
  const headerHeight = 160;

  return (
    <div className="w-screen text-slate-800 dark:text-slate-100 overflow-x-hidden">
      {/* ヒーロー */}
      <section
        className="flex flex-col justify-center px-6 text-center mb-20"
        style={{ height: `calc(100vh - ${headerHeight}px)` }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            プログラミング・技術のキャッチアップを直感的に。
          </h1>
          <p className="text-lg mb-8 text-slate-700 dark:text-slate-300">
            VoxQ は「情報技術を楽しい動画で理解する」新しい学習体験を提供します。
          </p>
        </div>
      </section>

      <section className="min-h-screen flex flex-col justify-center py-32 px-6 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-4">
              エンジニアの課題、技術学習の壁を乗り越える。
            </h2>
          </div>

          {/* 課題セクション */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {[
              {
                icon: "📚",
                title: "ドキュメント疲れ",
                description: "公式ドキュメントや技術書の複雑な説明に時間を費やしていませんか？"
              },
              {
                icon: "😴",
                title: "文章中心の学習に疲弊",
                description: "文字ばかりの学習コンテンツで集中力が続かない経験はありませんか？"
              },
              {
                icon: "⏰",
                title: "情報キャッチアップの負担",
                description: "新しい技術の習得に時間がかかり、キャッチアップが億劫になっていませんか？"
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-slate-200 dark:border-slate-700"
              >
                <div className="text-4xl mb-5">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-slate-100">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* 解決セクション */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-bold mb-4 text-slate-800 dark:text-white">
                <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                  VoxQ
                </span>{" "}
                で全て解決！
              </h3>
              <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                革新的な学習体験で、技術習得を楽しく効率的に。
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🎬",
                  title: "動画による直感的学習",
                  description: "複雑な概念を視覚的に理解。動画なら理解度が格段に向上します。",
                  features: ["視覚的な説明", "段階的な学習", "繰り返し視聴可能"],
                  color: "blue"
                },
                {
                  icon: "🗣️",
                  title: "VOICEVOX 音声ナレーション",
                  description: "親しみやすいキャラクターが分かりやすく解説。学習が楽しくなります。",
                  features: ["自然な音声", "感情豊かな解説", "聞き取りやすい"],
                  color: "indigo"
                },
                {
                  icon: "⚡",
                  title: "効率的な学習体験",
                  description: "短時間で要点を把握。忙しいエンジニアに最適な学習スタイルです。",
                  features: ["短時間集中", "要点を凝縮", "いつでも学習"],
                  color: "purple"
                }
              ].map((item, i) => (
                <div
                  key={i}
                  className={`bg-slate-50 dark:bg-slate-850 p-8 rounded-xl border border-slate-200 dark:border-slate-600 border-${item.color}-500 dark:border-${item.color}-400`}
                >
                  <div className="text-4xl mb-5">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-slate-100">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    {item.description}
                  </p>
                  <ul className="space-y-2">
                    {item.features.map((feature, j) => (
                      <li
                        key={j}
                        className="flex items-center text-sm text-slate-600 dark:text-slate-300"
                      >
                        <svg
                          className={`w-4 h-4 mr-2 text-${item.color}-500 dark:text-${item.color}-300`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA セクション */}
      <section className="py-32 px-6 bg-gradient-to-br from-slate-50 via-cyan-50 to-indigo-50 dark:from-slate-800 dark:via-slate-850 dark:to-slate-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-6">
            これからの時代は幅広い本質的な知識が求められます。
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-10 leading-relaxed">
            今は AI がコードを書く時代、エンジニアには「コードの本質を理解する力」が求められています。<br />
            技術の全体像や仕組みを知らなければ、バグやセキュリティの落とし穴も見抜けません。<br />
            VoxQは、技術の「なぜ・どうやって」を学ぶ、概念理解に特化した学習サービス。<br />
            AIへの指示の質、成果物のレビュー力を、一段階引き上げましょう。
          </p>
          <a
            href="/"
            className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-indigo-600 via-cyan-500 to-blue-600 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            無料で学習を始める
          </a>
        </div>
      </section>
    </div>
  );
}
