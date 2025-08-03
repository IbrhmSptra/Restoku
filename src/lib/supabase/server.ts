import { env } from "@/configs/environment";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

interface createClientOptions {
  isAdmin?: boolean;
}

export async function createClient({ isAdmin = false }: createClientOptions) {
  const cookieStore = await cookies();
  const {
    NEXT_PUBLIC_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
  } = env;

  return createServerClient(
    NEXT_PUBLIC_SUPABASE_URL!,
    isAdmin ? SUPABASE_SERVICE_ROLE_KEY : NEXT_PUBLIC_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            console.log("Error while setting cookies", cookiesToSet);
          }
        },
      },
    }
  );
}
