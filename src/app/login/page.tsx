"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
      setDisplayName(data.user?.user_metadata.display_name ?? null);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
      setDisplayName(session?.user?.user_metadata.display_name ?? null);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  async function signUp() {
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: name },
      },
    });
    if (error) {
      setErrorText(error.message);
      return;
    }
    setErrorText("");
  }

  async function signIn() {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setErrorText(error.message);
      return;
    }
    setErrorText("");
  }

  async function signOut() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      setErrorText(error.message);
      return;
    }
    setErrorText("");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-xl font-semibold">Login</h1>

      <p>
        {userEmail
          ? `Logged in as ${displayName ?? "no name"} (${userEmail})`
          : "Not logged in"}
      </p>

      {errorText ? <p>Error: {errorText}</p> : null}

      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Your name"
        className="border px-2 py-1"
      />
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
        className="border px-2 py-1"
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
        className="border px-2 py-1"
      />

      <button type="button" onClick={signUp} className="border px-2 py-1">
        Sign up
      </button>
      <button type="button" onClick={signIn} className="border px-2 py-1">
        Sign in
      </button>
      <button type="button" onClick={signOut} className="border px-2 py-1">
        Sign out
      </button>
    </main>
  );
}