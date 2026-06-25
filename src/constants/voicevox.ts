import { SpeakerId, SpeakerSettings } from "@/types/voicevox";

// NOTE: この並び順がトップページで選択できるスピーカーの並び順になる
export const SPEAKERS = [
  { id: 3, name: "ずんだもん", },
  { id: 2, name: "四国めたん" },
  { id: 61, name: "中国うさぎ" },
  { id: 8, name: "春日部つむぎ" },
] as const;

export const SPEAKER_IDS = SPEAKERS.map((speaker) => speaker.id);

export const SPEAKER_NAMES = SPEAKERS.map((speaker) => speaker.name);

// NOTE: 同じ値でもスピーカーによって読み上げ速度や印象が異なるため、デフォルト値を個別に設定
export const SPEED_OPTIONS = {
  2: { "ゆっくり": 1.1, "普通": 1.2, "はやい": 1.3 },
  3: { "ゆっくり": 1.2, "普通": 1.3, "はやい": 1.4 },
  8: { "ゆっくり": 1.1, "普通": 1.2, "はやい": 1.3 },
  61: { "ゆっくり": 1.25, "普通": 1.35, "はやい": 1.45 },
};

export const PITCH_OPTIONS = {
  2: { "低い": -0.1, "普通": 0, "高い": 0.1 },
  3: { "低い": -0.1, "普通": 0, "高い": 0.1 },
  8: { "低い": -0.1, "普通": 0, "高い": 0.1 },
  61: { "低い": -0.1, "普通": 0, "高い": 0.1 },
};

export const INTONATION_OPTIONS = {
  2: { "抑えめ": 0.5, "普通": 1, "大きめ": 1.5 },
  3: { "抑えめ": 0.5, "普通": 1, "大きめ": 1.5 },
  8: { "抑えめ": 0.5, "普通": 1, "大きめ": 1.5 },
  61: { "抑えめ": 0.5, "普通": 1, "大きめ": 1.5 },
};

export const DEFAULT_SPEAKER_SETTINGS: Record<SpeakerId, SpeakerSettings> = {
  2: { speedScale: SPEED_OPTIONS[2]["普通"], pitchScale: PITCH_OPTIONS[2]["普通"], intonationScale: INTONATION_OPTIONS[2]["普通"] },
  3: { speedScale: SPEED_OPTIONS[3]["普通"], pitchScale: PITCH_OPTIONS[3]["普通"], intonationScale: INTONATION_OPTIONS[3]["普通"] },
  8: { speedScale: SPEED_OPTIONS[8]["普通"], pitchScale: PITCH_OPTIONS[8]["普通"], intonationScale: INTONATION_OPTIONS[8]["普通"] },
  61: { speedScale: SPEED_OPTIONS[61]["普通"], pitchScale: PITCH_OPTIONS[61]["普通"], intonationScale: INTONATION_OPTIONS[61]["普通"] },
} as const;
