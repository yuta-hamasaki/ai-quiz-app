"use client";
import { createClient } from '@/utils/supabase/client';
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function ClientComponent() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getUser() {
      const supabase = createClient()
      const {data, error} = await supabase.auth.getUser();
      if(error || !data.user) {
        console.error("no user:", error);
        return;
      }else {
        setUser(data?.user)
      }
    }
    getUser();
  }, []);

  return <h2>{user?.email} Welcomeback, {user?.user_metadata.username}</h2>;
}