import { NextRequest, NextResponse } from "next/server";
import { SupabaseRequest, UserSpeakerSettingsType } from "@/types/supabase";
import { checkAnonUserApiUsage, checkUserApiUsage, getUserSpeakerSettings, increaseCountTodayFromAnonUserApiUsage, increaseCountTodayFromUserApiUsage, upsertUserSpeakerSettings } from "@/lib/supabase/queries";
import { User, SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { getSupabaseUserByRoute } from "@/lib/supabase/server";
import { DEFAULT_SPEAKER_SETTINGS } from "@/constants/voicevox";
import { getClientIp } from "@/lib/request/getClientIp";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json<SupabaseRequest | any>(); // TODO: 型
    const { supabase, user } = await getSupabaseUserByRoute()

    switch (type) {
      case "getUserSpeakerSettings":
        if (!user) {
          // TODO: speakerId に応じて返すデフォルト値を変更する
          return NextResponse.json({
            success: true, data: {
              mainSpeakerSettings: {
                speaker_id: data.speakerIds.mainSpeakerId,
                speed_scale: DEFAULT_SPEAKER_SETTINGS[data.speakerIds.mainSpeakerId as 3 | 2 | 61 | 8].speedScale,
                pitch_scale: DEFAULT_SPEAKER_SETTINGS[data.speakerIds.mainSpeakerId as 3 | 2 | 61 | 8].pitchScale,
                intonation_scale: DEFAULT_SPEAKER_SETTINGS[data.speakerIds.mainSpeakerId as 3 | 2 | 61 | 8].intonationScale,
              },
              subSpeakerSettings: {
                speaker_id: data.speakerIds.subSpeakerId,
                speed_scale: DEFAULT_SPEAKER_SETTINGS[data.speakerIds.subSpeakerId as 3 | 2 | 61 | 8].speedScale,
                pitch_scale: DEFAULT_SPEAKER_SETTINGS[data.speakerIds.subSpeakerId as 3 | 2 | 61 | 8].pitchScale,
                intonation_scale: DEFAULT_SPEAKER_SETTINGS[data.speakerIds.subSpeakerId as 3 | 2 | 61 | 8].intonationScale,
              },
            }
          });
        }
        return await handleGetUserSpeakerSettings(supabase, user, data as { speakerIds: { mainSpeakerId: UserSpeakerSettingsType['speakerId']; subSpeakerId: UserSpeakerSettingsType['speakerId'] } }); // TODO: 型
      case "upsertUserSpeakerSettings":
        if (!user) {
          return NextResponse.json({ success: false, data: null, message: "Must not happen: ログインしていないユーザーがリクエストを送信しています" }, { status: 401 });
        }
        return await handleUpsertUserSpeakerSettings(supabase, user, data as UserSpeakerSettingsType); // TODO: 型
      case "checkUserApiUsage":
        if (!user) {
          return await handleCheckAnonUserApiUsage(supabase, getClientIp(request));
        }
        return await handleCheckUserApiUsage(supabase, user);
      case "increaseCountTodayFromUserApiUsage":
        if (!user) {
          return await handleIncreaseCountTodayFromAnonUserApiUsage(
            supabase,
            getClientIp(request)
          );
        }
        return await handleIncreaseCountTodayFromUserApiUsage(supabase, user);
      default:
        return NextResponse.json({ success: false, message: "Must not happen: 存在しないリクエストです" }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

async function handleGetUserSpeakerSettings(supabase: SupabaseClient, user: User, data?: { speakerIds: { mainSpeakerId: UserSpeakerSettingsType['speakerId']; subSpeakerId: UserSpeakerSettingsType['speakerId'] } }) {
  const response = await getUserSpeakerSettings(supabase, user, data);
  return NextResponse.json({ success: true, data: response });
}

async function handleUpsertUserSpeakerSettings(supabase: SupabaseClient, user: User, data: UserSpeakerSettingsType) {
  const response = await upsertUserSpeakerSettings(supabase, user.id, data.speakerId, data.speedScale, data.pitchScale, data.intonationScale);
  return NextResponse.json({ success: true, data: response });
}

async function handleCheckUserApiUsage(supabase: SupabaseClient, user: User) {
  const response = await checkUserApiUsage(supabase, user);
  return NextResponse.json({ success: true, data: response });
}

async function handleCheckAnonUserApiUsage(supabase: SupabaseClient, ipAddress: string) {
  const response = await checkAnonUserApiUsage(supabase, ipAddress);
  return NextResponse.json({ success: true, data: response });
}

async function handleIncreaseCountTodayFromUserApiUsage(supabase: SupabaseClient, user: User) {
  const response = await increaseCountTodayFromUserApiUsage(supabase, user);
  if (response.error) {
    return NextResponse.json(
      { success: false, message: response.error.message },
      { status: 500 }
    );
  }
  return NextResponse.json({ success: true, data: response.data });
}

async function handleIncreaseCountTodayFromAnonUserApiUsage(supabase: SupabaseClient, ipAddress: string) {
  const response = await increaseCountTodayFromAnonUserApiUsage(supabase, ipAddress);
  if (response.error) {
    return NextResponse.json(
      { success: false, message: response.error.message },
      { status: 500 }
    );
  }
  return NextResponse.json({ success: true, data: response.data });
}