import { createClient } from "@supabase/supabase-js";

const URL = process.env.URL || "";
const KEY = process.env.ANON_KEY || "";

export const supabase = createClient(URL, KEY);
