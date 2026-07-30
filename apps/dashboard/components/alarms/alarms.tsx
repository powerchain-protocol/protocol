
"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const seed=[
  {id:"alarm_001",title:"Grid frequency variance",severity:"warning"},
  {id:"alarm_002",title:"Treasury policy review required",severity:"critical"}
] as const;

export function Alarms(){
  const [done,setDone]=useState<string[]>([]);
  return <section className="rounded-3xl border bg-white p-6"><h2 className="text-xl font-bold">Alarms</h2><div className="mt-5 space-y-3">{seed.map((alarm)=><article className="flex items-center gap-3 rounded-2xl border p-4" key={alarm.id}><div className="flex-1"><b className="text-sm">{alarm.title}</b><div className="mt-2"><Badge tone={done.includes(alarm.id)?"success":alarm.severity==="critical"?"danger":"warning"}>{done.includes(alarm.id)?"acknowledged":alarm.severity}</Badge></div></div>{!done.includes(alarm.id)&&<button onClick={()=>setDone([...done,alarm.id])} className="rounded-lg border px-3 py-2 text-xs font-bold">Acknowledge</button>}</article>)}</div></section>;
}
