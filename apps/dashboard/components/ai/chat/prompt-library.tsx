
const prompts=["Energy Production Report","Carbon Emission Analysis","Grid Optimization","Financial Summary","Asset Performance"];
export function PromptLibrary({onSelect}:{onSelect:(v:string)=>void}){return <section className="rounded-2xl border bg-white p-5"><h2 className="font-bold">Prompt Library</h2><div className="mt-4 space-y-2">{prompts.map(x=><button onClick={()=>onSelect(x)} key={x} className="block w-full rounded-xl p-3 text-left text-sm hover:bg-slate-50">{x}</button>)}</div></section>}
