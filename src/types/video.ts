import { SpeakerId } from "./voicevox";

export type SessionId = string;
export interface VideoData {
  id: number;
  text: string;
  speaker: number;
}

export type VideoScriptData = {
  titlePart: string;
  scriptPart: string;
  jsonPart: string;
}

export type VideoSpekaerIds = {
  mainSpeakerId: SpeakerId;
  subSpeakerId: SpeakerId;
}

/**
 * Gemini API のレスポンスのフォーマット
 * 【タイトル】
 * スクリプト（複数行）
 * 最後の行にJSON形式の翻訳辞書
 */
export type RawVideoTextData = string;

/**
 * 動画の内容を生成するためのデータ
 * @param videoTitle 動画のタイトル
 * @param videoDataList 動画のデータリスト
 * @param translationMap 翻訳辞書
 * @param lastVideoId 最後の動画ID。最後の動画のエンコードが完了したことを検知するために AWS Lambda で使用
 */
export type VideoContent = {
  videoTitle: string;
  videoDataList: VideoData[];
  translationMap: Record<string, string>;
  lastVideoId: number;
}

export type VoicevoxResponse = {
  message: string;
  videoTextDataWithAudioUrl: { // TODO: この型名変えたい videoData の方も。
    id: number;
    text: string;
    speaker: number;
    audioUrl: string;
  }
}

export type RemotionResponse = {
  hlsPlaylistUrl: string;
  message: string;
}

export type generateScriptResponse = {
  sessionId: string;
  videoContent: VideoContent;
}
