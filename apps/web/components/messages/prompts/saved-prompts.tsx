
"use client";

import { Bookmark, Heart, Trash2 } from "lucide-react";
import { usePrompts } from "@/hooks/use-prompts";

export function SavedPrompts({ onSelect }: { onSelect: (content: string) => void }) {
  const prompts = usePrompts();

  return (
    <section className="rounded-3xl border bg-white p-5">
      <div className="flex items-center justify-between">
        <div><p className="text-[10px] font-black uppercase tracking-[.15em] text-emerald-700">Prompt library</p><h2 className="mt-1 text-xl font-semibold">Saved prompts</h2></div>
        <Bookmark className="size-5 text-slate-400" />
      </div>
      <div className="mt-5 space-y-3">
        {prompts.visible.map((prompt) => (
          <article key={prompt.id} className="rounded-2xl border p-4">
            <button onClick={() => onSelect(prompt.content)} className="w-full text-left">
              <b className="text-sm">{prompt.title}</b>
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{prompt.content}</p>
            </button>
            <div className="mt-3 flex items-center justify-between">
              <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">{prompt.category}</span>
              <div className="flex gap-1">
                <button onClick={() => prompts.toggleFavorite(prompt.id)} className="rounded-lg p-2 hover:bg-slate-100"><Heart className={`size-3.5 ${prompt.favorite ? "fill-rose-500 text-rose-500" : ""}`} /></button>
                <button onClick={() => prompts.remove(prompt.id)} className="rounded-lg p-2 hover:bg-slate-100"><Trash2 className="size-3.5" /></button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
