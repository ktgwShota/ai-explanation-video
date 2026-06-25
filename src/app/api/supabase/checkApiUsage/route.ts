import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);
  // 認証済みユーザーの場合
  if (user) {
    const { data: userProfile } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    const { data: userApiUsage } = await supabase
      .from("user_api_usage")
      .select("*")
      .eq("user_id", user.id)
      .single();

    // TODO: ユーザー登録時に user_api_usage テーブルにデータを作成するようにする
    if (!userApiUsage) {
      return NextResponse.json(
        { message: "API の使用量が取得できませんでした" },
        { status: 400 }
      );
    }

    const today = new Date().toISOString().split("T")[0];
    if (userApiUsage.last_used_date !== today) {
      await supabase
        .from("user_api_usage")
        .update({ last_used_date: today, count_today: 0 })
        .eq("user_id", user.id);
    }

    const countToday = userApiUsage.count_today;
    const plan = userProfile.plan;

    if (plan === "free" && countToday >= 1) {
      return NextResponse.json(
        { message: "API 使用制限に達しました。" },
        { status: 429 }
      );
    } else if (plan === "pro" && countToday >= 10) {
      return NextResponse.json(
        { message: "API 使用制限に達しました。" },
        { status: 429 }
      );
    }

    // ユーザーのAPI使用量を更新
    await supabase
      .from("user_api_usage")
      .update({ count_today: countToday + 1 })
      .eq("user_id", user.id);

    return NextResponse.json({ success: true }, { status: 200 });
  } else {
    // 未認証ユーザーの場合
    // Cloudflareが付けてくれるIPを優先的に取得
    const headers = request.headers;
    const cfIp = headers.get("cf-connecting-ip");
    const realIp = headers.get("x-real-ip");
    const xForwardedFor = headers.get("x-forwarded-for");
    // TODO: 数字に変換したい
    const ipAddress = cfIp || realIp || xForwardedFor;

    const { data: anonApiUsage } = await supabase
      .from("anon_api_usage")
      .select("*")
      .eq("ip_address", ipAddress)
      .single();

    if (anonApiUsage) {
      if (anonApiUsage.count_today >= 1) {
        return NextResponse.json(
          { message: "API 使用制限に達しました。（未認証）" },
          { status: 429 }
        );
      }
    } else {
      // TODO: IPアドレスを変えて利用するユーザーが多いようであれば、uuid をローカルストレージやCookieに保存する対策を追加する（テーブルのカラムには既に既に追加済み）
      await supabase
        .from("anon_api_usage")
        .insert({ ip_address: ipAddress, count_today: 1 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  }
}
