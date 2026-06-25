import { SPEAKERS } from "@/constants/voicevox";

export type SpeakerId = typeof SPEAKERS[number]['id'];

export type SpeakerName = typeof SPEAKERS[number]['name'];

export type SpeakerSettings = {
  speedScale: number;
  pitchScale: number;
  intonationScale: number;
};

export type AllSpeakerSettings = {
  [key: string]: SpeakerSettings;
};