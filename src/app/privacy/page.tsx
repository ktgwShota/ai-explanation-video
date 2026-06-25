export const runtime = "edge";

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-5 px-6 pb-6 flex-grow border-[1px] rounded-[1px] dark:border-white border-gray-[#e2e8f0]">
      <h1 className="text-2xl font-bold mt-[66px] mb-16 text-center">
        プライバシーポリシー
      </h1>

      <div className="space-y-10 text-base leading-relaxed">
        <p>
          当方が提供する「VoxQ」（以下「本サービス」と表記）における個人情報の取扱いについて、プライバシーポリシー（以下「本ポリシー」と表記）を定めます。
        </p>

        <section>
          <h2 className="text-xl font-semibold mb-3 border-b pb-2">
            第1条（個人情報取扱事業者の情報）
          </h2>
          <ul className="list-none space-y-1">
            <li>名称：しよた</li>
            <li>連絡先：shiyota@voxq.jp</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 border-b pb-2">
            第2条（取得する情報）
          </h2>
          <p>
            当方は、本サービスの提供にあたり、ユーザーから以下の情報を取得します。
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>氏名、ニックネーム等のプロフィール情報</li>
            <li>メールアドレス、電話番号等の連絡先情報</li>
            <li>
              クレジットカード情報等の決済情報（決済は代行会社が行うため、当方はクレジットカード情報を保持しません）
            </li>
            <li>本人確認のための情報（必要な場合）</li>
            <li>Cookie、IPアドレス、端末情報、利用履歴等のサービス利用記録</li>
            <li>その他、ユーザーが任意に入力する情報</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 border-b pb-2">
            第3条（利用目的）
          </h2>
          <p>当方は、取得した個人情報を以下の目的で利用します。</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>本サービスの提供、運営、維持、保護のため</li>
            <li>ユーザーへのサポート、お問い合わせ対応のため</li>
            <li>料金の請求、本人確認のため</li>
            <li>本サービスの改善、品質向上、新サービスの開発のため</li>
            <li>規約違反行為への対応のため</li>
            <li>本サービスに関するお知らせ、キャンペーン等の案内のため</li>
            <li>法令等に基づく対応のため</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 border-b pb-2">
            第4条（第三者提供）
          </h2>
          <p>
            当方は、次に掲げる場合を除き、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>法令に基づく場合</li>
            <li>
              人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき
            </li>
            <li>
              利用目的の達成に必要な範囲内において、個人情報の取扱いの全部または一部を委託する場合
            </li>
            <li>
              合併その他の事由による事業の承継に伴って個人情報が提供される場合
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 border-b pb-2">
            第5条（安全管理措置）
          </h2>
          <p>
            当方は、取り扱う個人情報の漏えい、滅失またはき損の防止その他の個人情報の安全管理のために、必要かつ適切な措置を講じます。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 border-b pb-2">
            第6条（Cookie等の利用）
          </h2>
          <p>
            本サービスでは、サービスの利便性向上や利用状況の分析のため、Cookieを使用することがあります。また、Google
            Analyticsなどのアクセス解析ツールを利用し、サービスの改善に役立てています。これらのツールでは、匿名のトラフィックデータが収集されます。ユーザーはブラウザの設定でCookieを無効にすることができます。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 border-b pb-2">
            第7条（個人情報の開示・訂正等）
          </h2>
          <p>
            当方は、本人から個人情報の開示、訂正、追加、削除、利用停止または消去（以下「開示等」といいます。）を求められたときは、本人からのご請求であることを確認の上で、遅滞なく対応します。ご希望の場合は、第9条のお問い合わせ窓口までご連絡ください。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 border-b pb-2">
            第8条（免責事項）
          </h2>
          <p>
            本サービスからリンクされている他の事業者または個人のウェブサイトにおける個人情報の取扱いについては、当方は責任を負うものではありません。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 border-b pb-2">
            第9条（プライバシーポリシーの変更）
          </h2>
          <p>
            当方は、法令その他本ポリシーに別段の定めのある事項を除いて、事前の予告なく本ポリシーを変更することができるものとします。変更後のプライバシーポリシーは、本ページに掲載したときから効力を生じるものとします。
          </p>
        </section>

        <section>
          <p className="text-right">制定日：2025年6月25日</p>
        </section>
      </div>
    </main>
  );
}
