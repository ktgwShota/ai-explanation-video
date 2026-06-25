import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);

  try {
    const code = requestUrl.searchParams.get("code");
    if (!code) {
      console.error("認証コードが提供されていません");
      return NextResponse.redirect(
        `${requestUrl.origin}/auth/signin?error=認証コードが見つかりません`
      );
    }

    const supabase = createRouteHandlerClient({ cookies });

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("セッション交換中にエラーが発生しました:", error);
      return NextResponse.redirect(
        `${requestUrl.origin}/auth/signin?error=${encodeURIComponent(
          error.message
        )}`
      );
    }

    if (!data.session) {
      console.error("セッションデータが取得できませんでした");
      return NextResponse.redirect(
        `${requestUrl.origin}/auth/signin?error=セッションの作成に失敗しました`
      );
    }

    console.log("セッションが正常に作成されました:", data.session);
    return NextResponse.redirect(`${requestUrl.origin}`);
  } catch (error) {
    console.error("コールバックルートで予期せぬエラーが発生しました:", error);
    return NextResponse.redirect(
      `${requestUrl.origin}/auth/signin?error=予期せぬエラーが発生しました`
    );
  }
}
