
import { BatteryCharging, MapPin, PlugZap, RadioTower, Sun, Wind } from "lucide-react";
import type { EnergyLocation } from "@/types/locations";

const icons = {
  "power-station": RadioTower,
  "ev-station": PlugZap,
  "solar-farm": Sun,
  "wind-farm": Wind,
  "battery-site": BatteryCharging,
  "local-energy": MapPin,
  "grid-node": RadioTower
};

export function LocationCard({
  location,
  selected,
  onClick
}: {
  location: EnergyLocation;
  selected: boolean;
  onClick: () => void;
}) {
  const Icon = icons[location.category];

  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl border p-4 text-left transition ${
        selected ? "border-emerald-700 bg-emerald-50 shadow-md" : "border-slate-200 bg-white hover:border-emerald-300"
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-800"><Icon className="size-5" /></span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center justify-between gap-3">
            <b className="truncate text-sm">{location.name}</b>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700"><span className="size-1.5 rounded-full bg-emerald-500" />{location.status}</span>
          </span>
          <span className="mt-1 block text-xs text-slate-500">{location.municipality} · {location.operator}</span>
          <span className="mt-3 flex items-center justify-between text-xs">
            <span>{location.capacityMw ? `${location.capacityMw.toLocaleString("fi-FI")} MW` : `${location.availableKw?.toLocaleString("fi-FI")} kW`}</span>
            <span className="font-semibold text-emerald-700">{location.renewableSharePercent}% renewable</span>
          </span>
        </span>
      </div>
    </button>
  );
}
