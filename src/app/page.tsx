"use client";

import { useEffect, useState, type SubmitEvent } from "react";
import { createClient } from "@/utils/supabase/client";

type Message = {
  id: string;
  username: string;
  content: string;
  created_at: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [errorText, setErrorText] = useState("");
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const supabase = createClient();

    async function loadMessages() {
      const { data, error } = await supabase
        .from("messages")
        .select("id, username, content, created_at")
        .order("created_at", { ascending: true });

      if (error) {
        setErrorText(error.message);
        return;
      }

      setMessages(data ?? []);
    }

    loadMessages();
    const channel = supabase
  .channel("messages-feed")
  .on(
    "postgres_changes",
    { event: "INSERT", schema: "public", table: "messages" },
    (payload) => {
      const newMessage = payload.new as Message;
      setMessages((current) => [...current, newMessage]);
    }
  )
  .subscribe();

return () => {
  supabase.removeChannel(channel);
};
  }, []);

  async function sendMessage(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = createClient();
    const {error} = await supabase.from("messages").insert({
      username,content
    });
    if(error){
      setErrorText(error.message);
      return;
    }
    setErrorText("");
    setUsername("");
    setContent("");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-xl font-semibold">Messages</h1>

      {errorText ? <p>Error: {errorText}</p> : null}

      <ul className="space-y-2">
        {messages.map((message) => (
          <li key={message.id}>
            <strong>{message.username}:</strong> {message.content}
          </li>
        ))}
      </ul>

      <form onSubmit={sendMessage} className="flex flex-col gap-2">
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Your name"
          required
          className="border px-2 py-1"
        />
        <input
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Your message"
          required
          className="border px-2 py-1"
        />
        <button type="submit" className="border px-2 py-1">
          Send
        </button>
    </form>
    </main>
  );
}