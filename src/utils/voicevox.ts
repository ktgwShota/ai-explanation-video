import { SPEAKERS } from "@/constants/voicevox";
import { SpeakerId } from "@/types/voicevox";

export const getSpeakerNameById = (id: SpeakerId) => {
  return SPEAKERS.find((speaker) => speaker.id === id)?.name;
};
