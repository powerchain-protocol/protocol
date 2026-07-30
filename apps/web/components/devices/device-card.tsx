
import { Activity, BatteryCharging, Radio, WifiOff } from "lucide-react";

export function DeviceCard({ device }: { device: { id: string; name: string; category: string; status: string; lastSeenAt?: string } }) {
  const online = device.status === "online";
  return (
    <article className="pc-panel rounded-3xl p-5 transition hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <span className="grid size-11 place-items-center rounded-2xl bg-emerald-50 text-emerald-800">
          {online ? <Radio className="size-5" /> : <WifiOff className="size-5" />}
        </span>
        <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${online ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>{device.status}</span>
      </div>
      <h3 className="mt-5 font-bold">{device.name}</h3>
      <p className="mt-1 text-sm text-slate-500">{device.category}</p>
      <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
        <div className="rounded-xl bg-slate-50 p-3"><Activity className="mb-2 size-4 text-emerald-700" /><b>Live data</b></div>
        <div className="rounded-xl bg-slate-50 p-3"><BatteryCharging className="mb-2 size-4 text-emerald-700" /><b>Healthy</b></div>
      </div>
    </article>
  );
}
