import { VIDEO_SCRIPT_SYSTEM_PROMPT_TEMPLATE } from "@/constants/videoScriptSystemPromptTemplate";

export const GEMINI_MODEL =
  process.env.GEMINI_MODEL ?? "gemini-2.5-flash";

export function buildVideoScriptSystemPrompt(
  mainSpeakerName: string,
  subSpeakerName: string
): string {
  return VIDEO_SCRIPT_SYSTEM_PROMPT_TEMPLATE.replaceAll(
    "ずんだもん",
    mainSpeakerName
  ).replaceAll("四国めたん", subSpeakerName);
}
