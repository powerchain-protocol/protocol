
import { Clock3, MapPinned, Navigation } from "lucide-react";
import type { WayfinderRoute } from "@/lib/maps/wayfinder";

export function WayfinderPanel({ route }: { route: WayfinderRoute | null }) {
  if (!route) {
    return (
      <div className="rounded-2xl border border-dashed bg-slate-50 p-5 text-sm text-slate-500">
        Use your location and select an energy site to calculate a route.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-white text-emerald-800 shadow-sm"><Navigation className="size-5" /></span>
        <div><b>Wayfinder route</b><p className="text-xs text-slate-500">To {route.destination.name}</p></div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-white p-3"><MapPinned className="size-4 text-emerald-700" /><b className="mt-2 block">{route.distanceKm.toLocaleString("fi-FI", { maximumFractionDigits: 1 })} km</b></div>
        <div className="rounded-xl bg-white p-3"><Clock3 className="size-4 text-emerald-700" /><b className="mt-2 block">{route.estimatedMinutes} min</b></div>
      </div>
    </div>
  );
}
