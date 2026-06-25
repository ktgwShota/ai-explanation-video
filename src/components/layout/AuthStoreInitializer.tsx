"use client";

import { useRef, useEffect } from 'react';
import type { Session, User } from '@supabase/auth-helpers-nextjs';
import { UserProfile, useAuthStore } from '@/store/authStore';
import { UserSpeakerSettingsType } from '@/types/supabase';

export function AuthStoreInitializer({ user, userProfile, userSpeakerSettings }: { user: User | null, userProfile: UserProfile | null, userSpeakerSettings: UserSpeakerSettingsType[] | null }) {
  const { initialize } = useAuthStore();
  // 変数だと再レンダリングされる度に初期化される。useState 更新後に無駄な再レンダリングが発生するため useRef を使用
  const initialized = useRef(false);

  if (!initialized.current) {
    initialize({ user, userProfile, userSpeakerSettings });
    initialized.current = true;
  }

  return null;
}