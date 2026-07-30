
import { Badge } from "@/components/ui/badge";

export function IntegrationCard({
  name,category,status,description
}:{
  name:string;category:string;status:"connected"|"available"|"attention";description:string
}){
  return <article className="rounded-3xl border bg-white p-6"><div className="flex items-center justify-between"><span className="text-xs font-black uppercase tracking-wider text-emerald-700">{category}</span><Badge tone={status==="connected"?"success":status==="attention"?"warning":"neutral"}>{status}</Badge></div><h2 className="mt-5 text-xl font-bold">{name}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{description}</p><button className="mt-6 rounded-xl border px-4 py-2 text-sm font-bold">{status==="connected"?"Manage":"Connect"}</button></article>;
}
