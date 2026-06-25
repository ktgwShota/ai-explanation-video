import { VideoData, VoicevoxResponse } from "@/types/video";
import retry from "async-retry";

// TODO: バックエンドでバリデーションを行う
// Google Cloud Run
export const generateAudio = async (
  videoData: VideoData,
  speakerSetting: any,
  { signal }: { signal: AbortSignal }
) => {
  console.log(speakerSetting, "speakerSetting");
  return await retry(
    async (bail) => {
      if (signal.aborted) {
        bail(
          new DOMException(
            "ユーザーの操作によって処理を中止しました。",
            "AbortError"
          )
        );
      }

      const response = await fetch(
        "/api/voicevox",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            videoData,
            speakerSetting: speakerSetting ?? "",
          }),
          signal,
        }
      );

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(
          body?.error ??
            "API リクエストに失敗しました。障害が発生している可能性があるため、しばらく経ってから再度お試しください。"
        );
      }

      return (await response.json<VoicevoxResponse>())
        .videoTextDataWithAudioUrl;
    },
    {
      retries: 3,
      factor: 2,
      minTimeout: 1000,
    }
  );
};
