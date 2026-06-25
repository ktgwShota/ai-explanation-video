/**
 * ユーザーの API 使用量をチェック（認証済み or IP）し、使用制限に達している場合は処理を中断するためにスローする
 */
export const checkUserApiUsage = async ({
  signal,
}: {
  signal: AbortSignal;
}): Promise<void> => {
  // TODO: Supabase 復旧後に有効化
  // const response = await fetch("/api/supabase", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     type: "checkUserApiUsage",
  //   }),
  //   signal,
  // }).then((res) => res.json<any>());
  //
  // if (response.data.status === "error")
  //   throw new Error(response.data.message);
};

/**
 * API使用量をインクリメントする（認証済み or IP）
 */
export const increaseCountTodayFromUserApiUsage = async ({
  signal,
}: {
  signal: AbortSignal;
}): Promise<void> => {
  // TODO: Supabase 復旧後に有効化
  // await fetch("/api/supabase", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     type: "increaseCountTodayFromUserApiUsage",
  //   }),
  //   signal,
  // });
};
