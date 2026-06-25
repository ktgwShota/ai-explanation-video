import { useAuthStore } from "@/store/authStore";
import { SpeakerId } from "@/types/voicevox";

export function useAuth() {
  const { user, userProfile, userSpeakerSettings, signOut } = useAuthStore();

  // console.log(user, "user");
  /**
   * ログイン中のユーザーのスピーカーの音声設定を取得
   * @param speakerId? 指定しない場合はすべてのスピーカーの音声設定を取得
   */
  const fetchUserSpeakerSettings = async (speakerId?: SpeakerId) => {
    if (!user) {
      throw new Error('Must not happen: 認証ユーザーのみ使用できる関数です');
    }
    // TODO: Supabase 復旧後に有効化
    // const { supabase } = await getSupabaseSessionClient();
    // const { data, error } = await supabase.from('user_speaker_settings').select('*').eq('user_id', user.id);
    // if (error) {
    //   console.error('スピーカー音声設定の取得に失敗しました:', error);
    // }
    // if (data) {
    //   setUserSpeakerSettings(data);
    // } else {
    //   throw new Error('Must not happen: 存在しないユーザーの音声設定は取得できません');
    // }
  }
  return { user, userProfile, userSpeakerSettings, signOut, fetchUserSpeakerSettings };
}