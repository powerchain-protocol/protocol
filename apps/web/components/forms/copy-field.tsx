"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyField({ value, label = "Public key" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() { await navigator.clipboard.writeText(value); setCopied(true); window.setTimeout(() => setCopied(false), 1500); }
  return <div><label className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</label><div className="mt-2 flex rounded-xl border bg-slate-50"><input readOnly value={value} className="min-w-0 flex-1 bg-transparent px-3 py-2 font-mono text-xs outline-none"/><button type="button" onClick={copy} className="px-3" aria-label={`Copy ${label}`}>{copied?<Check className="size-4 text-emerald-600"/>:<Copy className="size-4"/>}</button></div></div>;
}
