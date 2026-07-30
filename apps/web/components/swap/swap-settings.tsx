
"use client";

import { Settings2 } from "lucide-react";
import { PopoverCard } from "@/components/ui/popover-card";

export type SwapSettingsValue = {
  slippageBps: number;
  mevProtection: boolean;
  priority: "standard" | "fast" | "turbo";
};

export function SwapSettings({
  value,
  onChange
}: {
  value: SwapSettingsValue;
  onChange: (value: SwapSettingsValue) => void;
}) {
  return (
    <PopoverCard
      title="Swap settings"
      trigger={
        <button className="rounded-xl border p-2 hover:bg-slate-50" aria-label="Open swap settings">
          <Settings2 className="size-4" />
        </button>
      }
    >
      <div className="space-y-5">
        <label className="block">
          <span className="text-sm font-semibold">Slippage tolerance</span>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {[10, 50, 100, 200].map((bps) => (
              <button
                key={bps}
                onClick={() => onChange({ ...value, slippageBps: bps })}
                className={`rounded-xl border px-3 py-2 text-sm ${
                  value.slippageBps === bps ? "border-emerald-700 bg-emerald-50 text-emerald-800" : ""
                }`}
              >
                {bps / 100}%
              </button>
            ))}
          </div>
        </label>

        <label className="flex items-start justify-between gap-4 rounded-xl border p-4">
          <div>
            <b className="text-sm">MEV protection</b>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Prefer protected routes and private transaction delivery where supported.
            </p>
          </div>
          <input
            type="checkbox"
            checked={value.mevProtection}
            onChange={(event) => onChange({ ...value, mevProtection: event.target.checked })}
            className="mt-1 size-5 accent-emerald-700"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold">Transaction priority</span>
          <select
            value={value.priority}
            onChange={(event) =>
              onChange({ ...value, priority: event.target.value as SwapSettingsValue["priority"] })
            }
            className="mt-2 h-11 w-full rounded-xl border bg-white px-3"
          >
            <option value="standard">Standard</option>
            <option value="fast">Fast</option>
            <option value="turbo">Turbo</option>
          </select>
        </label>
      </div>
    </PopoverCard>
  );
}
