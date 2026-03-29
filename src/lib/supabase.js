import { createClient } from "@supabase/supabase-js";

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const url = typeof rawUrl === "string" ? rawUrl.trim() : "";
const anonKey = typeof rawKey === "string" ? rawKey.trim() : "";

if (import.meta.env.PROD && typeof window !== "undefined") {
  console.info("[Supabase] VITE_SUPABASE_URL:", url ? "set" : "missing");
  console.info("[Supabase] VITE_SUPABASE_ANON_KEY:", anonKey ? "set" : "missing");
}

export const supabase =
  url && anonKey ? createClient(url, anonKey) : null;

export function isSupabaseConfigured() {
  return Boolean(supabase);
}
