import {
  VideoSpekaerIds,
  VideoData,
  VideoContent,
  SessionId,
} from "@/types/video";
import { replaceJapaneseWithEnglish } from "@/utils/text";
import { generateAudio } from "./generateAudio";
import { generateVideo } from "./generateVideo";
import { getSpeakerSettings } from "./getSpeakerSettings";

// NOTE: 動画の順序に関係なく処理を進めているので、動画がメチャクチャになるので、ラムダ側で順番を制御している
export default function generateVideoFromScript(
  sessionId: SessionId,
  videoContent: VideoContent,
  speakerIds: VideoSpekaerIds,
  { signal }: { signal: AbortSignal }
): {
  hlsPlaylistUrl: Promise<any>;
  allDone: Promise<void>;
} {
  const { videoTitle, videoDataList, translationMap, lastVideoId } =
    videoContent;

  const { promise: firstSuccess, resolve: resolveFirstSuccess } =
    createPromiseWithResolver<any>();
  const { promise: allDone, resolve: resolveAllDone } =
    createPromiseWithResolver<void>();

  (async () => {
    const { mainSpeakerSettings, subSpeakerSettings } =
      await getSpeakerSettings(speakerIds, { signal });

    const maxConcurrent = 4;
    const queue = [...videoDataList.entries()];
    const executing = new Set<Promise<void>>();
    let resolvedFirst = false;

    async function runTask(index: number, videoData: VideoData) {
      try {
        const speakerSetting =
          videoData.speaker === speakerIds.mainSpeakerId
            ? mainSpeakerSettings
            : subSpeakerSettings;

        const hlsPlaylistUrl = await processVideoData(
          sessionId,
          videoTitle,
          videoData,
          lastVideoId,
          speakerSetting,
          speakerIds,
          translationMap,
          { signal }
        );

        if (!resolvedFirst) {
          resolvedFirst = true;
          resolveFirstSuccess(hlsPlaylistUrl);
        }
      } catch (err) {
        console.error(`動画生成失敗(${index}):`, err);
      }
    }

    while (queue.length > 0 || executing.size > 0) {
      while (executing.size < maxConcurrent && queue.length > 0) {
        const [index, videoData] = queue.shift()!;
        const task = runTask(index, videoData).finally(() =>
          executing.delete(task)
        );
        executing.add(task);
      }

      if (executing.size > 0) {
        await Promise.race(executing);
      }
    }

    resolveAllDone();
    if (!resolvedFirst) {
      resolveFirstSuccess(null);
    }
  })();

  return { hlsPlaylistUrl: firstSuccess, allDone };
}

function createPromiseWithResolver<T>() {
  let resolveFn!: (value: T) => void;
  const promise = new Promise<T>((resolve) => {
    resolveFn = resolve;
  });
  return { promise, resolve: resolveFn };
}

// TODO: 毎回 translationMap を渡すのは無駄なので、直したいが、大差ないので暇な時でいい
async function processVideoData(
  sessionId: SessionId,
  videoTitle: string,
  videoData: VideoData,
  lastVideoId: number,
  speakerSetting: any,
  speakerIds: VideoSpekaerIds,
  translationMap: Record<string, string>,
  { signal }: { signal: AbortSignal }
) {
  const videoTextWithAudio = await generateAudio(videoData, speakerSetting, {
    signal,
  });
  // NOTE: 音声生成時に英語のテキストを渡すと英語がローマ字読みになるので、事前に英語から日本語に置換していた部分を英語に戻す
  videoTextWithAudio.text = replaceJapaneseWithEnglish(
    videoTextWithAudio.text,
    translationMap
  );

  const hlsPlaylistUrl = await generateVideo(
    sessionId,
    videoTitle,
    videoTextWithAudio,
    lastVideoId,
    speakerIds,
    { signal }
  );

  return hlsPlaylistUrl;
}
