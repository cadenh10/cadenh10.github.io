import { createClient } from "@supabase/supabase-js";

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const url = typeof rawUrl === "string" ? rawUrl.trim() : "";
const anonKey = typeof rawKey === "string" ? rawKey.trim() : "";

export const supabase =
  url && anonKey ? createClient(url, anonKey) : null;

export function isSupabaseConfigured() {
  return Boolean(supabase);
}
