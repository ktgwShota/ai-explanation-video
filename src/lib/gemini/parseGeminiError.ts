export function parseGeminiError(errorText: string): {
  message: string;
  status: number;
} {
  try {
    const parsed = JSON.parse(errorText) as {
      error?: { code?: number; message?: string; status?: string };
    };
    const code = parsed.error?.code;
    const message = parsed.error?.message ?? errorText;

    if (
      code === 429 ||
      message.includes("credits are depleted") ||
      parsed.error?.status === "RESOURCE_EXHAUSTED"
    ) {
      return {
        message:
          "Gemini API のクレジットが不足しています。Google AI Studio（https://aistudio.google.com/）で課金設定・クレジットを確認してください。",
        status: 429,
      };
    }

    if (code === 404 || message.includes("is not found")) {
      return {
        message:
          "Gemini モデルが見つかりません。GEMINI_MODEL の設定を確認してください。",
        status: 502,
      };
    }

    if (code === 400 && message.includes("API key")) {
      return {
        message: "GOOGLE_API_KEY が無効です。API キーを確認してください。",
        status: 401,
      };
    }

    if (code === 503 || parsed.error?.status === "UNAVAILABLE") {
      return {
        message:
          "Gemini API が混雑しています。しばらく待ってから再度お試しください。",
        status: 503,
      };
    }

    return { message, status: 500 };
  } catch {
    return { message: errorText, status: 500 };
  }
}

export class GeminiApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "GeminiApiError";
    this.status = status;
  }
}
