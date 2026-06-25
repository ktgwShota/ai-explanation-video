import { RawVideoTextData, VideoContent } from "@/types/video";
import { VideoData } from "./database";

/**
 * 英単語を日本語に置換
 */
export function replaceEnglishWithJapanese(
  text: string,
  translationMap: Record<string, string>
) {
  // 長い単語から順に置換（部分一致を防ぐため）
  const keys = Object.keys(translationMap).sort((a, b) => b.length - a.length);
  let result = text;
  for (const key of keys) {
    // 単語単位で置換したい場合は \b を使う
    result = result.replace(
      new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
      translationMap[key]
    );
  }
  return result;
}

/**
 * 日本語を英単語に置換
 */
export function replaceJapaneseWithEnglish(
  text: string,
  translationMap: Record<string, string>
) {
  // value（置換後の文字列）から key（元の単語）へ戻す
  const entries = Object.entries(translationMap);
  // valueが長い順に並べて部分一致を防ぐ
  entries.sort((a, b) => b[1].length - a[1].length);
  let result = text;
  for (const [key, value] of entries) {
    result = result.replace(
      new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
      key
    );
  }
  return result;
}

// TODO: この地点でjson来てな気がする
export function parseScriptToVideoData(script: string): any[] {
  console.log(script, "script");
  // JSON部分が始まる前までを抽出
  const lines = script.trim().split("\n");
  const result = [];
  for (const line of lines) {
    // JSON部分が始まったら終了
    if (line.trim().startsWith("{")) break;
    if (!line.trim()) continue; // 空行スキップ
    const match = line.match(/^(\d+)\s+(.*)\s+(\d+)\s*$/);
    if (!match) {
      throw new Error(`Invalid format: ${line}`);
    }
    const [, idStr, text, speaker] = match;
    result.push({
      id: parseInt(idStr, 10),
      text: text.trim(),
      speaker: parseInt(speaker, 10),
    });
  }
  return result;
}

export function generateVideoContent(rawVideoTextData: RawVideoTextData): VideoContent {
  // 1. 入力をトリムし、空行を除外して行の配列に分割する
  const lines = rawVideoTextData.trim().split('\n').filter(line => line.trim());

  // 2. 配列の最初の要素（タイトル）を取り出して 【】を除去
  const videoTitle = lines.shift()?.replace(/^【/, "").replace(/】$/, "") || "";

  // 3. 配列の最後の要素（JSON）を取り出す
  const translationJson = lines.pop() || '';
  const translationMap = JSON.parse(translationJson);

  // 4. 残った要素（スクリプト）を改行で結合する
  const videoScript = lines.join('\n');

  // 5. 英単語を日本語に置換
  const replacedScript = replaceEnglishWithJapanese(
    videoScript,
    translationMap
  );

  // 6. スクリプトをビデオデータに変換
  const videoDataList = parseScriptToVideoData(replacedScript);

  // 7. 最後の動画IDを取得
  const lastVideoId = Math.max(...videoDataList.map((item) => item.id));

  const videoContent: VideoContent = {
    videoTitle,
    videoDataList,
    translationMap,
    lastVideoId,
  }

  return videoContent;
}
