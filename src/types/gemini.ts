export type GeminiResponse = {
  candidates: {
    content: {
      parts: { text: string }[];
    };
  }[];
  usageMetadata: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
    promptTokensDetails: {
      modality: string;
      tokenCount: number;
    }[];
  };
  modelVersion: string;
  responseId: string;
}