"use client";

import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await fetch("/auth/signout");
      router.refresh(); // セッションを更新し、ログインページへリダイレクト
    } catch (err) {
      console.error("ログアウトに失敗しました:", err);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
    >
      サインアウト
    </button>
  );
}
