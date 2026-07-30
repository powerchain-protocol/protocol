"use client";
import { useState, type ReactNode } from "react";
import { ChevronDown, Code2, EyeOff } from "lucide-react";
export function CodeDisclosure({ title = "Source code", children, defaultOpen = false }: { title?: string; children: ReactNode; defaultOpen?: boolean }) {
 const [open,setOpen]=useState(defaultOpen);
 return <section className="my-5 overflow-hidden rounded-xl border bg-card"><button type="button" onClick={()=>setOpen(v=>!v)} className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium" aria-expanded={open}><span className="flex items-center gap-2">{open?<EyeOff className="size-4"/>:<Code2 className="size-4"/>}{open?"Hide":"Show"} {title}</span><ChevronDown className={`size-4 transition ${open?"rotate-180":""}`}/></button>{open?<div className="border-t p-4">{children}</div>:null}</section>;
}
