
export type PromptCategory =
  | "portfolio"
  | "energy"
  | "grid"
  | "trading"
  | "solana"
  | "risk"
  | "devices"
  | "general";

export type SavedPrompt = {
  id: string;
  title: string;
  content: string;
  category: PromptCategory;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ChatRole = "system" | "user" | "assistant" | "tool";

export type ChatMessage = {
  id: string;
  conversationId: string;
  role: ChatRole;
  content: string;
  model?: string;
  createdAt: string;
  status: "sending" | "sent" | "streaming" | "failed";
  toolCalls?: Array<{
    id: string;
    name: string;
    arguments: Record<string, unknown>;
    result?: unknown;
  }>;
};

export type ChatSettings = {
  model: string;
  temperature: number;
  maxOutputTokens: number;
  useLoraAdapter: boolean;
  loraAdapterId?: string;
  enableMpcTools: boolean;
  saveHistory: boolean;
};
