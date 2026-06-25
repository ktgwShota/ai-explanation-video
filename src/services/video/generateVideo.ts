// TODO: バックエンドでバリデーションを行う
import retry from "async-retry";
import {
  RemotionResponse,
  SessionId,
  VideoSpekaerIds,
  VoicevoxResponse,
} from "@/types/video";

// AWS API Gateway -> AWS Lambda 1 -> AWS Lambda 2 -> Cloudflare R2
export const generateVideo = async (
  sessionId: SessionId,
  videoTitle: string,
  videoTextDataWithAudioUrl: VoicevoxResponse["videoTextDataWithAudioUrl"],
  lastVideoId: number,
  speakerIds: VideoSpekaerIds,
  { signal }: { signal: AbortSignal }
) => {
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
        "/api/render",
        {
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
          signal,
        }
      );

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(
          body?.error ??
            "API リクエストに失敗しました。障害が発生している可能性があるため、しばらく経ってから再度お試しください。",
          { cause: response }
        );
      }

      return (await response.json<RemotionResponse>()).hlsPlaylistUrl;
    },
    {
      retries: 3,
      factor: 2,
      minTimeout: 1000,
    }
  );
};
