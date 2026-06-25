import { SpeakerId } from "@/types/voicevox";
import { z } from "zod";

export type GenerateVideoFormInput = z.infer<typeof generateVideoFormSchema>;
export const generateVideoFormSchema = z.object({
  theme: z.string().min(1, "テーマは必須です"),
  mainSpeakerId: z.custom<SpeakerId>(),
  subSpeakerId: z.custom<SpeakerId>(),
});

