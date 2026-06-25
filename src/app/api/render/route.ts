import { NextResponse } from "next/server";

export const runtime = "edge";

// AWS API Gateway 経由の動画レンダリング API へのプロキシ。
// VIDEO_RENDER_API_URL はサーバー専用の環境変数なので、クライアントから直接読めない。
// そのためこのルート経由でリクエストを転送する。
export async function POST(request: Request) {
  try {
    const videoRenderApiUrl = process.env.VIDEO_RENDER_API_URL;
    if (!videoRenderApiUrl) {
      return NextResponse.json(
        { error: "VIDEO_RENDER_API_URL が設定されていません" },
        { status: 500 }
      );
    }

    const { sessionId, videoTitle, videoTextDataWithAudioUrl, lastVideoId, speakerIds } =
      (await request.json()) as {
        sessionId: unknown;
        videoTitle: unknown;
        videoTextDataWithAudioUrl: unknown;
        lastVideoId: unknown;
        speakerIds: unknown;
      };

    const response = await fetch(videoRenderApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId,
        videoTitle,
        videoTextDataWithAudioUrl,
        lastVideoId,
        speakerIds,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      return NextResponse.json(
        { error: `動画レンダリングに失敗しました: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[ERROR] render API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An error occurred" },
      { status: 500 }
    );
  }
}
