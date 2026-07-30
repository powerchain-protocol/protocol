
"use client";

import { useCallback, useMemo, useState } from "react";
import type { PromptCategory, SavedPrompt } from "@/types/prompts.messages";
import { DEFAULT_SAVED_PROMPTS } from "@/data/ai/prompts";

export function usePrompts() {
  const [prompts, setPrompts] = useState<SavedPrompt[]>(DEFAULT_SAVED_PROMPTS);
  const [category, setCategory] = useState<"all" | PromptCategory>("all");

  const visible = useMemo(
    () => category === "all" ? prompts : prompts.filter((prompt) => prompt.category === category),
    [prompts, category]
  );

  const save = useCallback((input: Pick<SavedPrompt, "title" | "content" | "category">) => {
    const now = new Date().toISOString();
    setPrompts((current) => [{
      id: crypto.randomUUID(),
      favorite: false,
      createdAt: now,
      updatedAt: now,
      ...input
    }, ...current]);
  }, []);

  const remove = useCallback((id: string) => {
    setPrompts((current) => current.filter((prompt) => prompt.id !== id));
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setPrompts((current) => current.map((prompt) =>
      prompt.id === id ? { ...prompt, favorite: !prompt.favorite, updatedAt: new Date().toISOString() } : prompt
    ));
  }, []);

  return { prompts, visible, category, setCategory, save, remove, toggleFavorite };
}
