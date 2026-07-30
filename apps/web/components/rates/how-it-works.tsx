
export function HowItWorks(){
  const steps=[
    ["1","Select a market","Choose the electricity region or provider used for the estimate."],
    ["2","Enter consumption","Add expected or measured electricity consumption in kilowatt-hours."],
    ["3","Set renewable share","Estimate how much of the electricity is sourced from renewable generation."],
    ["4","Review the result","Compare estimated cost, renewable energy, and grid energy."]
  ];
  return <section><p className="text-xs font-black uppercase tracking-[.16em] text-emerald-700">How it works</p><h2 className="mt-3 text-4xl font-semibold">From global rate to clear estimate.</h2><div className="mt-8 grid gap-5 md:grid-cols-4">{steps.map(([n,t,d])=><article className="rounded-2xl border bg-white p-6" key={n}><span className="grid size-9 place-items-center rounded-full bg-emerald-800 font-bold text-white">{n}</span><h3 className="mt-4 font-bold">{t}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{d}</p></article>)}</div></section>
}
