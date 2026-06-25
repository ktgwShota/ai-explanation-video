"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      console.log("Attempting to sign in...");
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Sign in error:", error);
        setError(error.message);
        return;
      }

      console.log("Sign in successful:", data);

      // セッションを確認
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log("Current session:", session);

      if (session) {
        console.log("Redirecting to dashboard...");
        router.push("/");
        router.refresh();
      } else {
        console.error("No session found after sign in");
        setError("セッションの作成に失敗しました。");
      }
    } catch (err) {
      console.error("Unexpected error during sign in:", err);
      setError("サインイン中にエラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: "github" | "google") => {
    try {
      console.log(`Attempting ${provider} OAuth sign in...`);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        console.error(`${provider} OAuth error:`, error);
        setError(error.message);
      } else {
        console.log(`${provider} OAuth response:`, data);
      }
    } catch (err) {
      console.error(`Unexpected error during ${provider} OAuth:`, err);
      setError("OAuthサインイン中にエラーが発生しました。");
    }
  };

  return (
    <div className="mt-8 space-y-6">
      {/* <form className="space-y-6" onSubmit={handleSignIn}>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {error}
          </div>
        )}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            メールアドレス
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            パスワード
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? "サインイン中..." : "サインイン"}
          </button>
        </div>
      </form> */}

      <div className="mt-6">
        {/* <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-50 text-gray-500">または</span>
          </div>
        </div> */}

<div className="w-full max-w-sm mx-auto flex flex-col gap-3">
 {/* Google Button */}
  <button
    onClick={() => handleOAuthSignIn("google")}
    className="
      w-full flex items-center justify-center gap-3
      py-2.5 px-4
      rounded-lg
      shadow-md
      bg-white text-gray-600
      font-semibold text-base
      border border-gray-200
      transition
      hover:shadow-lg hover:border-gray-300
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    "
  >
    {/* Googleのマルチカラーアイコンを使うと、よりそれらしくなります */}
    <GoogleIcon sx={{ fontSize: 22 }} />
    Googleでサインイン
  </button>
  {/* GitHub Button */}
  <button
    onClick={() => handleOAuthSignIn("github")}
    className="
      w-full flex items-center justify-center gap-3
      py-2.5 px-4
      rounded-lg
      shadow-md
      bg-gray-900 text-white
      font-semibold text-base
      transition
      hover:bg-gray-800
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700
    "
  >
    <GitHubIcon sx={{ fontSize: 22 }} />
    GitHubでサインイン
  </button>
 
</div>
      </div>
    </div>
  );
}
