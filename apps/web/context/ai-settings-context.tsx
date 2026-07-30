
"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ChatSettings } from "@/types/prompts.messages";

const defaultSettings: ChatSettings = {
  model: "gridllm-large",
  temperature: 0.3,
  maxOutputTokens: 1600,
  useLoraAdapter: false,
  enableMpcTools: false,
  saveHistory: true
};

const AiSettingsContext = createContext<{
  settings: ChatSettings;
  update: (patch: Partial<ChatSettings>) => void;
} | null>(null);

export function AiSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState(defaultSettings);
  const value = useMemo(() => ({
    settings,
    update: (patch: Partial<ChatSettings>) => setSettings((current) => ({ ...current, ...patch }))
  }), [settings]);

  return <AiSettingsContext.Provider value={value}>{children}</AiSettingsContext.Provider>;
}

export function useAiSettings() {
  const context = useContext(AiSettingsContext);
  if (!context) throw new Error("AiSettingsProvider is missing");
  return context;
}
