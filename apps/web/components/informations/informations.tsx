
import { CircleCheck, Info, ShieldCheck } from "lucide-react";

export function Informations() {
  const items = [
    { title: "Trusted token list active", description: "Wallet and swap inputs are checked against verified assets.", Icon: ShieldCheck },
    { title: "Location data refreshed", description: "Grid and station information was updated recently.", Icon: CircleCheck },
    { title: "Wayfinder routes are estimates", description: "Use a navigation provider for turn-by-turn travel guidance.", Icon: Info }
  ];

  return (
    <section className="rounded-3xl border bg-white p-5">
      <h2 className="font-bold">Information</h2>
      <div className="mt-4 space-y-3">
        {items.map(({ title, description, Icon }) => (
          <div className="flex gap-3 rounded-2xl bg-slate-50 p-4" key={title}>
            <Icon className="size-5 shrink-0 text-emerald-700" />
            <div><b className="text-sm">{title}</b><p className="mt-1 text-xs leading-5 text-slate-500">{description}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}
