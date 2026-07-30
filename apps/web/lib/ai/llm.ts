
import type { ChatMessage, ChatSettings } from "@/types/prompts.messages";

export type LlmRequest = {
  conversationId: string;
  messages: ChatMessage[];
  settings: ChatSettings;
  agentId?: string;
};

export type LlmResponse = {
  id: string;
  content: string;
  model: string;
  usage: {
    inputTokens: number;
    outputTokens: number;
  };
  createdAt: string;
};

export async function sendLlmRequest(request: LlmRequest): Promise<LlmResponse> {
  const response = await fetch("/api/ai/chat", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(request)
  });

  if (!response.ok) throw new Error("AI request failed");
  return response.json();
}
