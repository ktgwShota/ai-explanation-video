import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function getSupabaseSessionClient() {
  const supabase = createClientComponentClient();
  const { data: { session } } = await supabase.auth.getSession();
  return { supabase, session }
}