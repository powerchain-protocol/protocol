
"use client";

import { BatteryCharging, MapPin, Minus, Navigation, Plus, RadioTower, Sun, Wind, Zap } from "lucide-react";
import type { EnergyLocation } from "@/types/locations";
import { calculateBounds, projectPoint } from "@/lib/maps/mapper";

const iconMap = {
  "power-station": RadioTower,
  "ev-station": Zap,
  "solar-farm": Sun,
  "wind-farm": Wind,
  "battery-site": BatteryCharging,
  "local-energy": MapPin,
  "grid-node": RadioTower
};

export function LocationMap({
  locations,
  selectedId,
  onSelect,
  onLocate,
  onZoomIn,
  onZoomOut
}: {
  locations: EnergyLocation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onLocate: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}) {
  const bounds = calculateBounds(locations);

  return (
    <div className="relative min-h-[540px] overflow-hidden rounded-[28px] border bg-[#eaf3ec] shadow-[0_18px_60px_rgba(15,23,42,.08)]">
      <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(8,122,59,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(8,122,59,.08)_1px,transparent_1px)] [background-size:36px_36px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(255,255,255,.9),transparent_18rem),radial-gradient(circle_at_80%_70%,rgba(16,185,129,.12),transparent_24rem)]" />
      <svg viewBox="0 0 800 520" className="absolute inset-0 h-full w-full opacity-65" aria-hidden>
        <path d="M65 110 C170 65, 250 150, 350 118 S550 42, 720 120" fill="none" stroke="#8fb39d" strokeWidth="4" strokeDasharray="10 12" />
        <path d="M90 390 C220 300, 310 420, 440 330 S640 270, 760 360" fill="none" stroke="#94bda2" strokeWidth="5" />
        <path d="M220 55 C255 170, 190 240, 300 340 S390 445, 460 500" fill="none" stroke="#bdd6c5" strokeWidth="3" />
      </svg>

      {bounds && locations.map((location) => {
        const point = projectPoint(location.position, bounds, 700, 420);
        const Icon = iconMap[location.category];
        const selected = selectedId === location.id;
        return (
          <button
            key={location.id}
            onClick={() => onSelect(location.id)}
            className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-2xl border p-2.5 shadow-lg transition ${
              selected ? "scale-110 border-emerald-700 bg-emerald-800 text-white" : "border-white bg-white text-emerald-800 hover:scale-105"
            }`}
            style={{ left: `${8 + (point.x / 700) * 84}%`, top: `${10 + (point.y / 420) * 78}%` }}
            aria-label={location.name}
          >
            <Icon className="size-5" />
          </button>
        );
      })}

      <div className="absolute right-4 top-4 z-20 grid gap-2">
        <button onClick={onZoomIn} className="grid size-10 place-items-center rounded-xl border bg-white shadow-sm"><Plus className="size-4" /></button>
        <button onClick={onZoomOut} className="grid size-10 place-items-center rounded-xl border bg-white shadow-sm"><Minus className="size-4" /></button>
        <button onClick={onLocate} className="grid size-10 place-items-center rounded-xl bg-emerald-800 text-white shadow-lg"><Navigation className="size-4" /></button>
      </div>

      <div className="absolute bottom-4 left-4 z-20 rounded-xl border bg-white/90 px-3 py-2 text-xs font-semibold text-slate-600 backdrop-blur">
        Live renewable infrastructure map
      </div>
    </div>
  );
}
