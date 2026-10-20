import { HomeScreen } from '@/components/home/HomeScreen';
import { testSupabaseConnection } from "@/lib/test-supabase";
import { useEffect } from "react";

export default function Index() {

  useEffect(() => {
    testSupabaseConnection();
  }, []);  

  return (
    <HomeScreen />
  )
}