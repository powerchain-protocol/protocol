
"use client";

import { useState } from "react";
import { ArrowUp, Paperclip } from "lucide-react";
import { Prompts } from "./prompts/prompts";

export function NewMessage({ onSend }: { onSend: (message: string) => void }) {
  const [value, setValue] = useState("");

  function submit() {
    const message = value.trim();
    if (!message) return;
    onSend(message);
    setValue("");
  }

  return (
    <div>
      <Prompts onSelect={setValue} />
      <div className="mt-4 rounded-2xl border bg-white p-3 shadow-lg">
        <textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              submit();
            }
          }}
          rows={3}
          className="w-full resize-none bg-transparent p-2 text-sm outline-none"
          placeholder="Ask Powerchain AI about assets, grids, markets, wallets, or transactions..."
        />
        <div className="flex items-center justify-between">
          <button className="rounded-xl p-2 hover:bg-slate-100" aria-label="Attach file"><Paperclip className="size-4" /></button>
          <button onClick={submit} disabled={!value.trim()} className="grid size-10 place-items-center rounded-xl bg-emerald-800 text-white disabled:opacity-40"><ArrowUp className="size-4" /></button>
        </div>
      </div>
    </div>
  );
}
