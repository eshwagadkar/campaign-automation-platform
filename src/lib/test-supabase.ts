import { supabase } from "@/lib/supabase";

export async function testSupabaseConnection() {
  const { data, error } = await supabase
    .from("campaigns")
    .select("id")
    .limit(1);

  if (error) {
    console.error("Supabase connection failed:", error.message);
    return;
  }

  console.log("Supabase connection successful:", data);
}