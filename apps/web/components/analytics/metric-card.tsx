
export function MetricCard({label,value,detail}:{label:string;value:string;detail?:string}){return <article className="rounded-[24px] border bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,.06)]"><small className="text-slate-500">{label}</small><strong className="mt-2 block text-2xl">{value}</strong>{detail&&<p className="mt-2 text-xs text-slate-400">{detail}</p>}</article>}
