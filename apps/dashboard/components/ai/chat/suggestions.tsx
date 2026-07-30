
const suggestions=["Show today's energy production summary","Analyze carbon emissions trend","Compare solar vs wind production","Check grid stability status","Generate compliance report"];
export function Suggestions({onSelect}:{onSelect:(v:string)=>void}){return <section className="rounded-2xl border bg-white p-5"><h2 className="font-bold">Suggestions</h2><div className="mt-4 grid gap-2">{suggestions.map(x=><button onClick={()=>onSelect(x)} key={x} className="rounded-xl border p-3 text-left text-sm hover:bg-emerald-50">{x}</button>)}</div></section>}
