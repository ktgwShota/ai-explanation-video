import {
    createRouteHandlerClient,
    createServerComponentClient,
    SupabaseClient
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache } from 'react';
import { User } from "@supabase/supabase-js";
import { UserProfile } from "@/store/authStore";
import { UserSpeakerSettingsType } from "@/types/supabase";

/**
 * Route Handlerで、検証済みのユーザー情報を取得します
 */
export async function getSupabaseUserByRoute(): Promise<{ supabase: SupabaseClient, user: User | null }> {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();
    return { supabase, user };
}

/**
 * Server Componentで、検証済みのユーザー情報を取得します
 */
export const getSupabaseUserByServer = cache(async (): Promise<{
    supabase: SupabaseClient,
    user: User | null,
    userProfile: UserProfile | null,
    userSpeakerSettings: UserSpeakerSettingsType[] | null
}> => {
    const supabase = createServerComponentClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { supabase, user: null, userProfile: null, userSpeakerSettings: null };
    }

    // TODO: Supabase 復旧後に有効化
    // const { data: userProfile } = await supabase
    //     .from('user_profiles')
    //     .select('*')
    //     .eq('id', user.id)
    //     .single();
    //
    // const { data: userSpeakerSettings } = await supabase
    //     .from('user_speaker_settings')
    //     .select('*')
    //     .eq('user_id', user.id);

    return { supabase, user, userProfile: null, userSpeakerSettings: null };
});
