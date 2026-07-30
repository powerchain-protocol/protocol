
"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { ENERGY_LOCATIONS, LOCATION_CATEGORIES } from "@/data/locations";
import { useMaps } from "@/hooks/use-maps";
import { useSearch } from "@/hooks/use-search";
import { LocationMap } from "./location-map";
import { LocationCard } from "./location-card";
import { WayfinderPanel } from "./wayfinder-panel";

export function GridExplorer() {
  const search = useSearch(ENERGY_LOCATIONS);
  const maps = useMaps(search.results);

  return (
    <div className="grid gap-5 xl:grid-cols-[390px_1fr]">
      <aside className="rounded-[28px] border bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,.06)]">
        <div className="flex items-center justify-between">
          <div><p className="text-[10px] font-black uppercase tracking-[.15em] text-emerald-700">Wayfinder</p><h2 className="mt-1 text-2xl font-semibold">Energy locations</h2></div>
          <SlidersHorizontal className="size-5 text-slate-400" />
        </div>

        <label className="relative mt-5 block">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search.query}
            onChange={(event) => search.setQuery(event.target.value)}
            className="h-11 w-full rounded-xl border bg-slate-50 pl-10 pr-3 text-sm outline-none focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-700/10"
            placeholder="Search station, city, operator..."
          />
        </label>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {LOCATION_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => search.setCategory(category.id as typeof search.category)}
              className={`whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold ${
                search.category === category.id ? "bg-emerald-800 text-white" : "border bg-white text-slate-600"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <p className="mt-4 text-xs text-slate-500">{search.resultCount} locations found</p>
        <div className="mt-3 max-h-[430px] space-y-3 overflow-y-auto pr-1">
          {search.results.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              selected={maps.selectedId === location.id}
              onClick={() => maps.select(location.id)}
            />
          ))}
        </div>

        <div className="mt-4"><WayfinderPanel route={maps.route} /></div>
      </aside>

      <div>
        <LocationMap
          locations={search.results}
          selectedId={maps.selectedId}
          onSelect={maps.select}
          onLocate={maps.locate}
          onZoomIn={maps.zoomIn}
          onZoomOut={maps.zoomOut}
        />

        {maps.selected && (
          <section className="mt-5 grid gap-4 rounded-[28px] border bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,.06)] sm:grid-cols-2 lg:grid-cols-4">
            <div><small className="text-slate-500">Selected location</small><b className="mt-1 block">{maps.selected.name}</b></div>
            <div><small className="text-slate-500">Operator</small><b className="mt-1 block">{maps.selected.operator}</b></div>
            <div><small className="text-slate-500">Renewable share</small><b className="mt-1 block">{maps.selected.renewableSharePercent}%</b></div>
            <div><small className="text-slate-500">Status</small><b className="mt-1 block capitalize text-emerald-700">{maps.selected.status}</b></div>
          </section>
        )}
      </div>
    </div>
  );
}
