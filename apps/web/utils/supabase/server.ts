
import { createServerClient } from "@supabase/ssr";
import type { CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

function requireEnvironment() {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL and publishable key are required.");
  }
  return { supabaseUrl, supabaseKey };
}

export async function createClient(cookieStore?: Awaited<ReturnType<typeof cookies>>) {
  const store = cookieStore ?? await cookies();
  const environment = requireEnvironment();

  return createServerClient(environment.supabaseUrl, environment.supabaseKey, {
    cookies: {
      getAll() {
        return store.getAll();
      },
      setAll(cookiesToSet: Array<{ name: string; value: string; options: CookieOptions }>) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {
          // Server Components cannot always write cookies. Proxy session refresh handles this case.
        }
      }
    }
  });
}
