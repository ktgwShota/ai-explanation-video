import { NextResponse } from "next/server";

export const runtime = "edge";

// Google Cloud Run の VOICEVOX エンジンへのプロキシ。
// VOICEVOX_API_URL はサーバー専用の環境変数なので、クライアントから直接読めない。
// そのためこのルート経由でリクエストを転送する。
export async function POST(request: Request) {
  try {
    const voicevoxApiUrl = process.env.VOICEVOX_API_URL;
    if (!voicevoxApiUrl) {
      return NextResponse.json(
        { error: "VOICEVOX_API_URL が設定されていません" },
        { status: 500 }
      );
    }

    const { videoData, speakerSetting } = (await request.json()) as {
      videoData: unknown;
      speakerSetting: unknown;
    };

    const response = await fetch(voicevoxApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        videoData,
        speakerSetting: speakerSetting ?? "",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      return NextResponse.json(
        { error: `音声生成に失敗しました: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[ERROR] voicevox API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An error occurred" },
      { status: 500 }
    );
  }
}
