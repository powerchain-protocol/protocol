
import {AI_SUGGESTIONS} from "@/constants/ai";
export function ChatSuggestions({onSelect}:{onSelect:(value:string)=>void}){return <div className="flex flex-wrap gap-2">{AI_SUGGESTIONS.map(s=><button onClick={()=>onSelect(s)} className="rounded-full border bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:border-emerald-300 hover:bg-emerald-50" key={s}>{s}</button>)}</div>}
