import { env } from "@/configs/environment";
import { createBrowserClient } from "@supabase/ssr";
export function createClient() {
  const { NEXT_PUBLIC_ANON_KEY, NEXT_PUBLIC_SUPABASE_URL } = env;
  return createBrowserClient(NEXT_PUBLIC_SUPABASE_URL!, NEXT_PUBLIC_ANON_KEY!);
}
