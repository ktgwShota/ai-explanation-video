export const runtime = "edge";

export default function TermsOfServicePage() {
  return (
    <main className="max-w-3xl mx-5 px-6 pb-6 flex-grow border-[1px] dark:border-white border-gray-[#e2e8f0] rounded-[1px]">
      <h1 className="text-2xl font-bold mt-[66px] mb-16 text-center">
        利用規約
      </h1>

      <div className="space-y-10 text-base leading-relaxed">
        <p>
          当方が提供するサービス「VoxQ」（以下「本サービス」と表記）を利用する全てのユーザーは、本利用規約に同意した上で本サービスを利用するものとします。
        </p>

        <section>
          <h2 className="text-xl font-semibold mb-3 border-b pb-2">
            第1条（適用）
          </h2>
          <p>
            本規約は、ユーザーと当方との間の本サービスの利用に関わる一切の関係に適用されるものとします。当方が当方ウェブサイト上で掲載する本サービス利用に関するルールは、本規約の一部を構成するものとします。
          </p>
        </section>

        {/* ... (以下、前回と同じ条文が続きます) ... */}

        <section>
          <h2 className="text-xl font-semibold mb-3 border-b pb-2">
            第2条（利用登録）
          </h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              本サービスの利用を希望する者は、本規約に同意の上、当方の定める方法によって利用登録を申請し、当方がこれを承認することによって、利用登録が完了するものとします。
            </li>
            <li>
              当方は、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、その理由については一切の開示義務を負わないものとします。
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>利用登録の申請に際して虚偽の事項を届け出た場合</li>
                <li>本規約に違反したことがある者からの申請である場合</li>
                <li>その他、当方が利用登録を相当でないと判断した場合</li>
              </ul>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 border-b pb-2">
            第3条（ユーザーIDおよびパスワードの管理）
          </h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              ユーザーは、自己の責任において、本サービスのユーザーIDおよびパスワードを適切に管理するものとします。
            </li>
            <li>
              ユーザーは、いかなる場合にも、ユーザーIDおよびパスワードを第三者に譲渡または貸与し、もしくは第三者と共用することはできません。当方は、ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合には、そのユーザーIDを登録しているユーザー自身による利用とみなします。
            </li>
            <li>
              ユーザーID及びパスワードが第三者によって使用されたことによって生じた損害は、当方に故意又は重大な過失がある場合を除き、当方は一切の責任を負わないものとします。
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 border-b pb-2">
            第4条（サブスクリプション）
          </h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              ユーザーは、サブスクリプションを利用する場合、当方が別途定める利用料金を、当方が指定する方法により支払うものとします。
            </li>
            <li>
              サブスクリプションの契約期間は、申込時に定められた期間とし、ユーザーが契約期間満了前に当方所定の方法で解約手続きを行わない限り、契約は同条件で自動的に更新されるものとします。
            </li>
            <li>
              当方は、一度支払われた利用料金について、当方の責めに帰すべき事由がある場合を除き、いかなる理由であっても返金を行いません。
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 border-b pb-2">
            第5条（禁止事項）
          </h2>
          <p>
            ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>法令または公序良俗に違反する行為</li>
            <li>犯罪行為に関連する行為</li>
            <li>
              当方のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
            </li>
            <li>本サービスの運営を妨害するおそれのある行為</li>
            <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
            <li>不正アクセスをし、またはこれを試みる行為</li>
            <li>他のユーザーに成りすます行為</li>
            <li>
              当方のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為
            </li>
            <li>
              当方、本サービスの他の利用者または第三者の知的財産権、肖像権、プライバシー、名誉その他の権利または利益を侵害する行為
            </li>
            <li>その他、当方が不適切と判断する行為</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 border-b pb-2">
            第6条（本サービスの提供の停止等）
          </h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              当方は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  本サービスにかかるコンピュータシステムの保守点検または更新を行う場合
                </li>
                <li>
                  地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合
                </li>
                <li>コンピュータまたは通信回線等が事故により停止した場合</li>
                <li>その他、当方が本サービスの提供が困難と判断した場合</li>
              </ul>
            </li>
            <li>
              当方は、本サービスの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 border-b pb-2">
            第7条（知的財産権）
          </h2>
          <p>
            本サービスによって提供されるソフトウェア、コンテンツ等に関する著作権、商標権、その他一切の知的財産権は、当方または当方にライセンスを許諾している者に帰属します。ユーザーは、当方の事前の許諾なく、これらを複製、送信、譲渡、貸与、翻訳、翻案、改変、転載等してはならないものとします。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 border-b pb-2">
            第8条（利用制限および登録抹消）
          </h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              当方は、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、ユーザーに対して本サービスの全部もしくは一部の利用を制限し、またはユーザーとしての登録を抹消することができるものとします。
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>本規約のいずれかの条項に違反した場合</li>
                <li>登録事項に虚偽の事実があることが判明した場合</li>
                <li>料金等の支払債務の不履行があった場合</li>
                <li>当方からの連絡に対し、一定期間返答がない場合</li>
                <li>
                  その他、当方が本サービスの利用を適当でないと判断した場合
                </li>
              </ul>
            </li>
            <li>
              当方は、本条に基づき当方が行った行為によりユーザーに生じた損害について、一切の責任を負いません。
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 border-b pb-2">
            第9条（保証の否認および免責事項）
          </h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              当方は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
            </li>
            <li>
              当方は、本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。ただし、本サービスに関する当方とユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。
            </li>
            <li>
              前項ただし書に定める場合であっても、当方は、当方の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち、特別な事情から生じた損害（当方またはユーザーが損害発生につき予見し、または予見し得た場合を含みます。）について一切の責任を負いません。
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 border-b pb-2">
            第10条（サービス内容の変更等）
          </h2>
          <p>
            当方は、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 border-b pb-2">
            第11条（利用規約の変更）
          </h2>
          <p>
            当方は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお、本規約の変更後、本サービスの利用を開始した場合には、当該ユーザーは変更後の規約に同意したものとみなします。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 border-b pb-2">
            第12条（個人情報の取扱い）
          </h2>
          <p>
            当方は、本サービスの利用によって取得する個人情報については、当方「プライバシーポリシー」に従い適切に取り扱うものとします。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 border-b pb-2">
            第13条（準拠法・裁判管轄）
          </h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>本規約の解釈にあたっては、日本法を準拠法とします。</li>
            <li>
              本サービスに関して紛争が生じた場合には、当方の住所地を管轄する裁判所を専属的合意管轄とします。
            </li>
          </ol>
        </section>

        <section>
          <p className="text-right">以上</p>
        </section>

        <section>
          <p className="text-right">制定日: 2025年6月25日</p>
        </section>
      </div>
    </main>
  );
}
