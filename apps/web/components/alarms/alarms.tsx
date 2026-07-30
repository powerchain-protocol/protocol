
import { AlertTriangle, BellRing, CircleAlert } from "lucide-react";
import type { PlatformAlarm } from "@/types/alarms";

const alarms: PlatformAlarm[] = [
  {
    id: "alarm_grid_001",
    title: "Grid frequency variance",
    description: "Tampere Grid Hub reported a transient frequency deviation.",
    severity: "warning",
    source: "grid",
    acknowledged: false,
    createdAt: new Date().toISOString()
  },
  {
    id: "alarm_device_002",
    title: "Inverter telemetry delayed",
    description: "Oulu Solar One has not delivered telemetry for 11 minutes.",
    severity: "info",
    source: "device",
    acknowledged: false,
    createdAt: new Date().toISOString()
  }
];

export function Alarms() {
  return (
    <section className="rounded-3xl border bg-white p-5">
      <div className="flex items-center justify-between"><h2 className="font-bold">Alarms</h2><BellRing className="size-5 text-slate-400" /></div>
      <div className="mt-4 space-y-3">
        {alarms.map((alarm) => (
          <article key={alarm.id} className={`flex gap-3 rounded-2xl border p-4 ${alarm.severity === "warning" ? "border-amber-200 bg-amber-50" : "bg-slate-50"}`}>
            {alarm.severity === "warning" ? <AlertTriangle className="size-5 shrink-0 text-amber-700" /> : <CircleAlert className="size-5 shrink-0 text-blue-700" />}
            <div><b className="text-sm">{alarm.title}</b><p className="mt-1 text-xs leading-5 text-slate-600">{alarm.description}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}
