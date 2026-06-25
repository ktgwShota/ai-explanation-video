import { NextResponse } from "next/server";
import {
  generateVideoFormSchema,
} from "@/schemas/generateVideoFormSchema";

export const runtime = "edge";

function getOpenAiWorkerUrl(): string {
  const url = process.env.OPENAI_WORKER_URL;
  if (!url) {
    throw new Error("OPENAI_WORKER_URL が設定されていません");
  }
  return url;
}

export async function POST(request: Request) {
  try {
    const workerUrl = getOpenAiWorkerUrl();
    const body = (await request.json()) as any;
    const { type, videoTitle, videoData } = body;

    if (type === "image") {
      const response = await fetch(
        workerUrl,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "videoText",
            videoTitle,
            videoData,
          }),
        }
      );
      return NextResponse.json(response);
    }

    const { theme, speakerIds } = body

    // // 動画テキスト生成のリクエスト
    // const parsed = generateVideoFormSchema.safeParse(data);
    // if (!parsed.success) {
    //   return NextResponse.json(
    //     { error: "Invalid request data" },
    //     { status: 400 }
    //   );
    // }

    // const { theme, mainSpeakerName, subSpeakerName } = parsed.data;
    // const mainSpeakerId = getSpeakerIdByName(mainSpeakerName);
    // const subSpeakerId = getSpeakerIdByName(subSpeakerName);

    const response = await fetch(
      workerUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "videoText",
          theme,
          speakerIds,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Failed to generate video: ${errorText}` },
        { status: response.status }
      );
    }

    const responseData = await response.json();
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("[ERROR] API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An error occurred" },
      { status: 500 }
    );
  }
}
