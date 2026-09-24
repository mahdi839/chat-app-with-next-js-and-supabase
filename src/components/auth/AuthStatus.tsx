"use client"
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";

export default function AuthStatus() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
      setDisplayName(data.user?.user_metadata.display_name ?? null);
    });
    const {data: {subscription}} = supabase.auth.onAuthStateChange((_event, session) => {
        setUserEmail(session?.user?.email ?? null);
        setDisplayName(session?.user?.user_metadata.display_name ?? null);
    });
    return () => {
        subscription.unsubscribe();
    };
  }, []);
  return <div>
    {
        userEmail?
        `Signed in as ${displayName??"Guest User"} - ${userEmail}`
        : " "
    }
  </div>;
}
