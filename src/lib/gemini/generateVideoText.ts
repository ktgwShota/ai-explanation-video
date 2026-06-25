import { GeminiResponse } from "@/types/gemini";
import { VideoSpekaerIds } from "@/types/video";
import { getSpeakerNameById } from "@/utils/voicevox";
import { buildVideoScriptSystemPrompt, GEMINI_MODEL } from "./buildSystemPrompt";
import { GeminiApiError, parseGeminiError } from "./parseGeminiError";

const FALLBACK_MODELS = [
  GEMINI_MODEL,
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash",
].filter((model, index, models) => models.indexOf(model) === index);

async function callGeminiModel(
  apiKey: string,
  model: string,
  systemInstruction: string,
  theme: string
): Promise<GeminiResponse> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemInstruction }],
        },
        contents: [
          {
            role: "user",
            parts: [{ text: `テーマ: ${theme}` }],
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    const { message, status } = parseGeminiError(errorText);
    throw new GeminiApiError(message, status);
  }

  const data = (await response.json()) as {
    candidates?: GeminiResponse["candidates"];
    usageMetadata?: GeminiResponse["usageMetadata"];
    modelVersion?: string;
    responseId?: string;
  };

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Gemini API から空のレスポンスが返されました");
  }

  return {
    candidates: data.candidates!,
    usageMetadata: data.usageMetadata ?? {
      promptTokenCount: 0,
      candidatesTokenCount: 0,
      totalTokenCount: 0,
      promptTokensDetails: [],
    },
    modelVersion: data.modelVersion ?? model,
    responseId: data.responseId ?? crypto.randomUUID(),
  };
}

function isRetryableGeminiError(error: unknown): boolean {
  if (!(error instanceof GeminiApiError)) {
    return false;
  }

  return error.status === 503 || error.status === 429 || error.status === 500;
}

export async function generateVideoText(
  theme: string,
  speakerIds: VideoSpekaerIds
): Promise<GeminiResponse> {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_API_KEY が設定されていません");
  }

  const mainSpeakerName = getSpeakerNameById(speakerIds.mainSpeakerId);
  const subSpeakerName = getSpeakerNameById(speakerIds.subSpeakerId);

  if (!mainSpeakerName || !subSpeakerName) {
    throw new Error("スピーカー ID が不正です");
  }

  const systemInstruction = buildVideoScriptSystemPrompt(
    mainSpeakerName,
    subSpeakerName
  );

  let lastError: unknown;

  for (const model of FALLBACK_MODELS) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        return await callGeminiModel(apiKey, model, systemInstruction, theme);
      } catch (error) {
        lastError = error;
        if (!isRetryableGeminiError(error)) {
          throw error;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Gemini API へのリクエストに失敗しました");
}
