import { UserSpeakerSettingsType } from "@/types/supabase";
import { SupabaseClient, User } from "@supabase/auth-helpers-nextjs";
import { DEFAULT_SPEAKER_SETTINGS } from "@/constants/voicevox";
import { SpeakerId } from "@/types/voicevox";

function defaultSpeakerSettings(speakerId: SpeakerId) {
  const settings = DEFAULT_SPEAKER_SETTINGS[speakerId];
  return {
    speaker_id: speakerId,
    speed_scale: settings.speedScale,
    pitch_scale: settings.pitchScale,
    intonation_scale: settings.intonationScale,
  };
}

/**
 * ユーザーのキャラクター設定をUpsert（存在すれば更新、なければ新規作成）
 */
export async function upsertUserSpeakerSettings(
  supabase: SupabaseClient,
  userId: User['id'],
  speakerId: UserSpeakerSettingsType['speakerId'],
  speedScale: UserSpeakerSettingsType['speedScale'],
  pitchScale: UserSpeakerSettingsType['pitchScale'],
  intonationScale: UserSpeakerSettingsType['intonationScale'],
) {
  return await supabase.from("user_speaker_settings").upsert({
    user_id: userId,
    speaker_id: speakerId,
    speed_scale: speedScale,
    pitch_scale: pitchScale,
    intonation_scale: intonationScale,
  });
}

/**
 * ユーザーのキャラクター設定を取得
 * @param supabase
 * @param user
 * @param data
 * @returns
 */
// TODO: ユーザー登録時にデフォルト値をデータベース側で設定する
export async function getUserSpeakerSettings(supabase: SupabaseClient, user: User, data?: { speakerIds: { mainSpeakerId: UserSpeakerSettingsType['speakerId']; subSpeakerId: UserSpeakerSettingsType['speakerId'] } }) {
  if (!data) {
    const allSpeakerSettings = await supabase.from("user_speaker_settings").select("*").eq("user_id", user.id);
    return allSpeakerSettings;
  }

  const { mainSpeakerId, subSpeakerId } = data.speakerIds;
  const mainSpeakerSettings = await supabase
    .from("user_speaker_settings")
    .select("*")
    .eq("user_id", user.id)
    .eq("speaker_id", mainSpeakerId)
    .maybeSingle();
  const subSpeakerSettings = await supabase
    .from("user_speaker_settings")
    .select("*")
    .eq("user_id", user.id)
    .eq("speaker_id", subSpeakerId)
    .maybeSingle();

  return {
    mainSpeakerSettings:
      mainSpeakerSettings.data ??
      defaultSpeakerSettings(mainSpeakerId as SpeakerId),
    subSpeakerSettings:
      subSpeakerSettings.data ??
      defaultSpeakerSettings(subSpeakerId as SpeakerId),
  };
}
// 以下を試す
// await supabase
//     .from("user_speaker_settings")
//     .select("*")
//     .eq("user_id", user.user.id)
//     .in("speaker_id", [mainSpeakerId, subSpeakerId]);


async function getUserApiUsage(supabase: SupabaseClient, user: User) {
  return await supabase
    .from("user_api_usage")
    .select("*")
    .eq("user_id", user.id)
    .single();
}

async function getAnonUserApiUsage(supabase: SupabaseClient, ipAddress: string) {
  return await supabase
    .from("anon_api_usage")
    .select("*")
    .eq("ip_address", ipAddress)
    .single();
}

async function getUserProfile(supabase: SupabaseClient, user: User) {
  return await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user.id)
    .single();
}

/**
 * 認証済みユーザーの API 使用量をインクリメント
 * この関数を使用する際は必ず事前に checkUserApiUsage を実行する
 */
export async function increaseCountTodayFromUserApiUsage(supabase: SupabaseClient, user: User) {
  const { data, error } = await getUserApiUsage(supabase, user);
  const today = new Date().toISOString().split("T")[0];

  if (error || !data) {
    return await supabase.from("user_api_usage").insert({
      user_id: user.id,
      count_today: 1,
      last_used_date: today,
    });
  }

  const countToday =
    data.last_used_date === today ? data.count_today + 1 : 1;

  return await supabase
    .from("user_api_usage")
    .update({ count_today: countToday, last_used_date: today })
    .eq("user_id", user.id);
}

/**
 * 未認証ユーザーの API 使用量をインクリメント
 * この関数を使用する際は必ず事前に checkAnonUserApiUsage を実行する
 */
export async function increaseCountTodayFromAnonUserApiUsage(supabase: SupabaseClient, ipAddress: string) {
  const { data, error } = await getAnonUserApiUsage(supabase, ipAddress);
  const today = new Date().toISOString().split("T")[0];

  if (error || !data) {
    return await supabase.from("anon_api_usage").insert({
      ip_address: ipAddress,
      count_today: 1,
      last_used_date: today,
    });
  }

  const countToday =
    data.last_used_date === today ? data.count_today + 1 : 1;

  return await supabase
    .from("anon_api_usage")
    .update({ count_today: countToday, last_used_date: today })
    .eq("ip_address", ipAddress);
}

/**
 * 認証済みユーザーの API 使用量を取得し、API 使用制限に達していないかチェック
 */
export async function checkUserApiUsage(supabase: SupabaseClient, user: User) {
  const { data: userProfile, error: userProfileError } = await getUserProfile(supabase, user);
  const { data: userApiUsage, error: userApiUsageError } = await getUserApiUsage(supabase, user);
  // TODO: ユーザー登録時に user_api_usage テーブルにデータを作成するようにしないとここでエラーが発生する
  if (userProfileError || userApiUsageError) {
    throw new Error("Must not happen: ユーザーの API 使用量の取得に失敗しました。");
  }

  const today = new Date().toISOString().split("T")[0];
  // 最後に API を使用した日付が今日でない場合は API 使用量をリセット　
  if (userApiUsage.last_used_date !== today) {
    // TODO: 関数化
    const { error: updateError } = await supabase
      .from("user_api_usage")
      .update({ last_used_date: today, count_today: 0 })
      .eq("user_id", user.id);

    if (updateError) {
      throw new Error("Must not happen: API 使用量のリセットに失敗しました。");
    }

    return {
      status: "success",
      message: "API 使用可能",
    };
  }

  switch (userProfile.plan) {
    case "free":
      if (userApiUsage.count_today >= 1) {
        return { status: "error", message: "API 使用制限に達しました。" };
      }
      return { status: "success", message: "API 使用可能" };
    case "basic":
      if (userApiUsage.count_today >= 10) {
        return { status: "error", message: "API 使用制限に達しました。" };
      }
      return { status: "success", message: "API 使用可能" };
    case 'admin': // このプランは supabase の DB から直接指定しない限り設定できない
      return { status: "success", message: "API 使用可能" };
    default:
      return { status: "error", message: "Must not happen: 存在しないプランです。" };
  }
}

/**
 * 未認証ユーザーの API 使用量を取得し、API 使用制限に達していないかを確認 
 * 自動的に DB にユーザーの IP アドレスを登録する機構がないため、IP アドレスが登録されていない場合はエラーを握り潰して登録
 */
export async function checkAnonUserApiUsage(supabase: SupabaseClient, ipAddress: string) {
  const { data } = await supabase
    .from("anon_api_usage")
    .select("*")
    .eq("ip_address", ipAddress)
    .single();

  // データがない = エラーはっせい場合は新規作成
  if (!data) {
    const today = new Date().toISOString().split("T")[0];
    const { error } = await supabase
      .from("anon_api_usage")
      .insert({
        ip_address: ipAddress,
        count_today: 0,
        last_used_date: today,
      });

    if (error) {
      throw new Error("Must not happen: 未認証ユーザーの API 使用量の登録に失敗しました。");
    }

    return {
      status: "success",
      message: "API 使用可能",
    };
  }

  // 最後に API を使用した日付が今日でない場合はリセット
  const today = new Date().toISOString().split("T")[0];
  if (data.last_used_date !== today) {
    await supabase
      .from("anon_api_usage")
      .update({ count_today: 0, last_used_date: today })
      .eq("ip_address", ipAddress);

    return {
      status: "success",
      message: "API 使用可能",
    };
  }

  if (data.count_today >= 1) {
    return { status: "error", message: "API 使用制限に達しました。" };
  }

  return { status: "success", message: "API 使用可能" };
}

