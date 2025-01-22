import { createClient, SupabaseClient } from "@supabase/supabase-js";

const URL = process.env.URL || "";
const KEY = process.env.ANON_KEY || "";

let supabaseClient: SupabaseClient;

const getSupabaseClient = () => {
  if (!supabaseClient) {
    supabaseClient = createClient(URL, KEY);
  }
  return supabaseClient;
};

export const supabase = getSupabaseClient()
