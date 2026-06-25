import { DEFAULT_SPEAKER_SETTINGS } from "@/constants/voicevox";
import { SpeakerId } from "@/types/voicevox";

function buildDefaultSpeakerSettings(speakerId: SpeakerId) {
  const settings = DEFAULT_SPEAKER_SETTINGS[speakerId];
  return {
    speaker_id: speakerId,
    speed_scale: settings.speedScale,
    pitch_scale: settings.pitchScale,
    intonation_scale: settings.intonationScale,
  };
}

export async function getSpeakerSettings(
  speakerIds: {
    mainSpeakerId: number;
    subSpeakerId: number;
  },
  { signal }: { signal: AbortSignal }
) {
  // TODO: Supabase 復旧後に /api/supabase から取得する
  // const response = await fetch("/api/supabase", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     type: "getUserSpeakerSettings",
  //     data: { speakerIds },
  //   }),
  //   signal,
  // });

  return {
    mainSpeakerSettings: buildDefaultSpeakerSettings(
      speakerIds.mainSpeakerId as SpeakerId
    ),
    subSpeakerSettings: buildDefaultSpeakerSettings(
      speakerIds.subSpeakerId as SpeakerId
    ),
  };
}
