import retry from "async-retry";
import { GeminiResponse } from "@/types/gemini";
import { generateScriptResponse, VideoSpekaerIds } from "@/types/video";
import { generateVideoContent } from "@/utils/text";

export const generateScript = async (
  theme: string,
  speakerIds: VideoSpekaerIds,
  { signal }: { signal: AbortSignal }
): Promise<generateScriptResponse> => {
  try {
    const response = await retry(
      async (bail, attempt) => {
        if (signal.aborted) {
          bail(
            new DOMException(
              "ユーザーの操作によって処理を中止しました。",
              "AbortError"
            )
          );
        }

        const response = await fetch("/api/gemini", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "videoText",
            theme,
            speakerIds,
          }),
          signal,
        });

        if (!response.ok) {
          const body = (await response.json().catch(() => null)) as {
            error?: string;
          } | null;
          throw new Error(
            body?.error ??
              "API リクエストに失敗しました。障害が発生している可能性があるため、しばらく経ってから再度お試しください。"
          );
        }

        return response.json<GeminiResponse>();
      },
      {
        retries: 3,
        factor: 2,
        minTimeout: 1000,
      }
    );

    const sessionId = response.responseId;
    const rawVideoTextData = response.candidates[0].content.parts[0].text;
    // NOTE: IT に関係のない内容が入力された場合は '-' がレスポンスに含まれる
    if (rawVideoTextData === "-") {
      throw new Error("情報技術に関する質問を入力してください。");
    }
    // NOTE: 100文字未満の場合は AI が生成したテキストが不正
    if (rawVideoTextData.length < 100) {
      throw new Error(
        "API のレスポンスが不正です。障害が発生している可能性があるため、しばらく経ってから再度お試しください。"
      );
    }

    const videoContent = generateVideoContent(rawVideoTextData);

    return {
      sessionId,
      videoContent,
    };
  } catch (error) {
    throw error;
  }
};
