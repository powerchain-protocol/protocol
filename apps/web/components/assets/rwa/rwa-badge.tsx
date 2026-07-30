import type { RwaAssetClass } from "./rwa-types";
const labels: Record<RwaAssetClass,string>={renewable:"Renewable",energy:"P2P Energy",carbon:"Carbon",hardware:"Hardware"};
export function RwaBadge({assetClass}:{assetClass:RwaAssetClass}){return <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-200">{labels[assetClass]}</span>}
