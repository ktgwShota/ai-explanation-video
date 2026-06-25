"use client";
import { Button } from "@mui/material";
import { Check } from "lucide-react";
import { handlePlanChange } from "./actions";
import { cookies } from "next/headers";
import { Close } from "@mui/icons-material";
import { useAuth } from "@/hooks/useAuth";

export const runtime = "edge";

// TODO: plan を subscription に変更する

export default function PlanPage() {
  const { userProfile } = useAuth();

  const plans = [
    {
      name: "Free",
      price: "¥0 / 月",
      features: ["1日2本の動画生成", "混雑時、待機時間が発生"],
      type: "free",
      priceId: "price_free", // NOTE: 独自定義。この値が渡された場合はサブスクリプションを解約する
    },
    {
      name: "Basic",
      price: "¥980 / 月",
      features: [
        "1日10本の動画生成",
        "動画保存機能（ローカル）",
        "音声カスタマイズ機能",
        "混雑時、優先的に動画生成",
      ],
      type: "basic",
      priceId: "price_1RXfKvQTI2O8Yob76HCWk5BV", // Stripeの価格ID
    },
    // {
    //   name: "Premium",
    //   price: "¥2,980 / 月",
    //   features: [
    //     "1日20本の動画生成",
    //     "動画保存機能（クラウド）",
    //     "テキスト要約動画生成機能",
    //     "専用サーバーによる高速動画生成",
    //   ],
    //   type: "premium",
    //   priceId: "", // Stripeの価格ID
    // },
  ];

  return (
    <main className="flex-grow w-full flex flex-col items-center justify-center mx-auto px-4">
      <h1 className="text-2xl font-semibold text-center mb-12 text-gray-900 dark:text-white">
        サブスクリプション
      </h1>

      <div className="w-full mx-auto flex flex-wrap justify-center gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 ${
              plans.length === 1
                ? "w-full"
                : plans.length === 2
                ? "w-full sm:w-72"
                : "w-full sm:w-72"
            } ${
              userProfile?.plan === plan.name
                ? "border-blue-500 bg-white shadow-blue-500/20 dark:border-blue-400 dark:bg-gray-800/50 dark:shadow-blue-400/20"
                : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-600 dark:bg-gray-800/50 dark:hover:border-gray-500"
            }`}
          >
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              {plan.name}
            </h2>
            <p className="text-lg font-semibold mb-6 text-blue-600 dark:text-blue-300">
              {plan.price}
            </p>

            <ul className="space-y-3 text-sm mb-6">
              {plan.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-center text-gray-600 dark:text-gray-300"
                >
                  {plan.name === "Free" && idx === 1 ? (
                    <Close className="!w-[18px] !h-[18px] text-red-500 mr-2" />
                  ) : (
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                  )}
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <form action={handlePlanChange}>
              <input type="hidden" name="planName" value={plan.name} />
              <input type="hidden" name="priceId" value={plan.priceId} />
              <Button
                type="submit"
                variant="contained"
                className="w-full font-semibold text-sm py-2.5 px-4 rounded-lg transition-all duration-200 hover:scale-[0.98] active:scale-[0.98]"
                disabled={
                  plan.type === "premium"
                    ? true
                    : userProfile?.plan === plan.type
                }
                sx={{
                  "&.Mui-disabled": {
                    backgroundColor: "#f3f4f6",
                    color: "#6b7280",
                    border: "1px solid #d1d5db",
                    "@media (prefers-color-scheme: dark)": {
                      backgroundColor: "#374151",
                      color: "#9ca3af",
                      border: "1px solid #4b5563",
                    },
                  },
                  backgroundColor: userProfile?.plan === plan.type
                    ? "#10b981"
                    : "#2563eb",
                  color: "white",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: userProfile?.plan === plan.type
                      ? "#059669"
                      : "#1d4ed8",
                    "@media (prefers-color-scheme: dark)": {
                      backgroundColor: userProfile?.plan === plan.type
                        ? "#047857"
                        : "#2563eb",
                    },
                  },
                  "@media (prefers-color-scheme: dark)": {
                    backgroundColor: userProfile?.plan === plan.type
                      ? "#059669"
                      : "#3b82f6",
                  },
                }}
              >
                {plan.type === "premium"
                  ? "現在提供停止中"
                  : userProfile?.plan === plan.type
                  ? "現在のプラン"
                  : "プランを変更"}
              </Button>
            </form>
          </div>
        ))}
      </div>
    </main>
  );
}
