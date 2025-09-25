import { createClient } from "@supabase/supabase-js";
import { getSession } from "@/lib/session";

// Create server-side Supabase client with auth session
export async function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Get the session from cookies
  const session = await getSession();

  if (session?.access_token) {
    // Set the session on the client
    await supabase.auth.setSession({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    });
  }

  return supabase;
}
