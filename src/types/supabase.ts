export type UserSpeakerSettingsType = {
  speakerId: number;
  speedScale: number;
  pitchScale: number;
  intonationScale: number;
}

export type SupabaseRequest = {
  type: string;
  data: UserSpeakerSettingsType | { speakerIds: { mainSpeakerId: UserSpeakerSettingsType['speakerId']; subSpeakerId: UserSpeakerSettingsType['speakerId'] } };
}

export type SupabaseResponse<T> = {
  success: boolean;
  data: {
    mainSpeakerSettings: T;
    subSpeakerSettings: T;
  };
}

export type UserSpeakerSettingsResponse = {
  error: null | Error;
  data: {
    user_id: string;
    speaker_id: number;
    speed_scale: number;
    pitch_scale: number;
    intonation_scale: number;
    created_at: string;
    updated_at: string;
  }
  count: number | null;
  status: number;
  statusText: string;
}

export type UserSpeakerSettingsSupabaseResponse = SupabaseResponse<UserSpeakerSettingsResponse>;


