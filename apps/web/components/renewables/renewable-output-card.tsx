
import { BatteryCharging, Leaf, Sun, Wind } from "lucide-react";

const rows = [
  { label: "Solar", value: "8.9 MW", share: 45, Icon: Sun },
  { label: "Wind", value: "12.4 MW", share: 32, Icon: Wind },
  { label: "Storage", value: "6.1 MWh", share: 15, Icon: BatteryCharging },
  { label: "Carbon", value: "325.7 t", share: 8, Icon: Leaf }
];

export function RenewableOutputCard() {
  return (
    <section className="rounded-3xl border bg-white p-6 shadow-[var(--pc-card-shadow)]">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Live portfolio</p>
          <h2 className="mt-2 text-2xl font-semibold">Renewable output</h2>
        </div>
        <strong className="text-3xl">27.4 MW</strong>
      </div>
      <div className="mt-7 space-y-5">
        {rows.map(({ label, value, share, Icon }) => (
          <div key={label}>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2"><Icon className="size-4 text-emerald-700" />{label}</span>
              <b>{value}</b>
            </div>
            <div className="mt-2 h-2 rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-800 to-emerald-400" style={{ width: `${share}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
