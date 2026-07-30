import Image from "next/image";
import { Activity, Boxes, Cpu, Database, Leaf, Radio, Workflow } from "lucide-react";
import { platformMetrics } from "@/data/metrics";
import { renewableSites } from "@/data/renewables";
import { energyPools } from "@/data/pools";
import { smartMeters } from "@/data/smart-meters";
import { depinNodes } from "@/data/depin";
import { devices } from "@/data/devices";

const architectures = [
  { title: "System overview", description: "Clients, APIs, indexing, services and multichain settlement.", src: "/architectures/system-overview.svg" },
  { title: "Solana contracts", description: "Anchor, SPL Token, RWA registries, certificates and Metaplex.", src: "/architectures/solana-architecture.svg" },
  { title: "Sui Move", description: "Coin capabilities, shared objects, settlement and bridge boundaries.", src: "/architectures/sui-architecture.svg" },
  { title: "Energy marketplace", description: "Local discovery, P2P matching, settlement and certificate retirement.", src: "/architectures/energy-marketplace.svg" },
  { title: "DePIN and IoT", description: "Meters, LoRaWAN, ingestion, oracles, indexers and on-chain proofs.", src: "/architectures/depin-iot.svg" },
  { title: "Data and analytics", description: "Typed data, validation, streaming, storage and dashboard metrics.", src: "/architectures/data-analytics.svg" },
] as const;

const liveData = [
  { label: "Renewable sites", value: renewableSites.length, icon: Leaf },
  { label: "Energy pools", value: energyPools.length, icon: Workflow },
  { label: "Smart meters", value: smartMeters.length, icon: Activity },
  { label: "DePIN nodes", value: depinNodes.length, icon: Radio },
  { label: "Managed devices", value: devices.length, icon: Cpu },
  { label: "Metric streams", value: platformMetrics.length, icon: Database },
];

export function Architectures() {
  return (
    <div className="space-y-10">
      <header className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 p-7 sm:p-10">
        <div className="grid gap-8 xl:grid-cols-[1fr_560px] xl:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300"><Boxes size={14} /> Architecture registry</div>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">PowerChain platform architecture</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">A unified view of renewable markets, real-world assets, P2P energy trading, DePIN infrastructure, IoT telemetry, Solana programs, Sui Move modules and analytics.</p>
          </div>
          <Image src="/architectures/powerchain-platform-architecture.png" alt="PowerChain architecture documentation overview" width={1536} height={1024} priority className="rounded-2xl border border-white/10 shadow-2xl" />
        </div>
      </header>

      <section>
        <div className="mb-5 flex items-end justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">Reference diagrams</p><h2 className="mt-2 text-2xl font-semibold text-white">System maps</h2></div><span className="text-sm text-slate-400">Versioned with the repository</span></div>
        <div className="grid gap-6 xl:grid-cols-2">
          {architectures.map((item) => <article key={item.src} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]"><Image src={item.src} alt={item.title} width={1600} height={900} className="h-auto w-full" /><div className="p-5"><h3 className="text-lg font-semibold text-white">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p></div></article>)}
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <div className="flex items-center gap-3"><Activity className="text-emerald-300" /><div><h2 className="text-2xl font-semibold text-white">Data modules</h2><p className="text-sm text-slate-400">Typed demo data for development, documentation and UI integration.</p></div></div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{liveData.map(({ label, value, icon: Icon }) => <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/60 p-5"><div className="flex items-center justify-between"><Icon className="text-emerald-300" size={20}/><span className="text-3xl font-bold text-white">{value}</span></div><p className="mt-5 text-sm font-medium text-slate-300">{label}</p></div>)}</div>
      </section>
    </div>
  );
}
