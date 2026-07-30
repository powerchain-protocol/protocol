
"use client";

import { useState } from "react";
import type { ChatMessage } from "@/types/prompts.messages";
import { AiSettingsProvider } from "@/context/ai-settings-context";
import { NewMessage } from "@/components/messages/new-message";
import { SavedPrompts } from "@/components/messages/prompts/saved-prompts";
import { ChatSettingsPanel } from "./chat-settings";
import { Alarms } from "@/components/alarms/alarms";
import { Informations } from "@/components/informations/informations";

function Workspace() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  function addMessage(content: string) {
    setMessages((current) => [...current, {
      id: crypto.randomUUID(),
      conversationId: "conversation_current",
      role: "user",
      content,
      createdAt: new Date().toISOString(),
      status: "sent"
    }]);
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[300px_1fr_330px]">
      <SavedPrompts onSelect={addMessage} />
      <section className="flex min-h-[660px] flex-col rounded-3xl border bg-[#f8faf9] p-5 shadow-[0_18px_60px_rgba(15,23,42,.06)]">
        <div className="border-b pb-5"><p className="text-[10px] font-black uppercase tracking-[.15em] text-emerald-700">GridLLM workspace</p><h2 className="mt-1 text-2xl font-semibold">Powerchain AI</h2></div>
        <div className="flex-1 space-y-4 overflow-y-auto py-5">
          {!messages.length && <div className="grid h-full place-items-center text-center text-sm text-slate-500">Start a conversation using a saved or quick prompt.</div>}
          {messages.map((message) => (
            <div key={message.id} className="ml-auto max-w-[82%] rounded-2xl rounded-br-md bg-emerald-800 px-4 py-3 text-sm leading-6 text-white">
              {message.content}
            </div>
          ))}
        </div>
        <NewMessage onSend={addMessage} />
      </section>
      <div className="space-y-5">
        <ChatSettingsPanel />
        <Alarms />
        <Informations />
      </div>
    </div>
  );
}

export function AiWorkspace() {
  return <AiSettingsProvider><Workspace /></AiSettingsProvider>;
}
