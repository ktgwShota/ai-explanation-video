import { create } from 'zustand';
import type { User } from '@supabase/supabase-js';
import getSupabaseSessionClient from '@/lib/supabase/client';
import { UserSpeakerSettingsType } from '@/types/supabase';

export interface UserProfile {
  id: string;
  username: string;
  plan: 'free' | 'premium';
}

interface UserState {
  user: User | null;
  userProfile: UserProfile | null;
  userSpeakerSettings: UserSpeakerSettingsType[] | null;
  setUserSpeakerSettings: (data: UserSpeakerSettingsType[]) => void;
  initialize: (data: { user: User | null; userProfile: UserProfile | null; userSpeakerSettings: UserSpeakerSettingsType[] | null }) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<UserState>((set) => ({
  user: null,
  userProfile: null,
  userSpeakerSettings: null,
  setUserSpeakerSettings: (data) => set({ userSpeakerSettings: data }),
  initialize: (data) => set({ user: data.user, userProfile: data.userProfile, userSpeakerSettings: data.userSpeakerSettings }),
  signOut: async () => {
    const { supabase } = await getSupabaseSessionClient();
    await supabase.auth.signOut();
    set({ user: null, userProfile: null });
  },
}));
