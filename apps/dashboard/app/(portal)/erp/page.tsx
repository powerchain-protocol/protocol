
const entries=[
  ["INV-2026-00841","Crowdfunding settlement","€84 200","Posted"],
  ["INV-2026-00840","Energy market fees","€12 840","Posted"],
  ["INV-2026-00839","SaaS subscriptions","€44 950","Pending"]
];

export default function ErpPage(){
  return <div><p className="text-xs font-black uppercase tracking-wider text-emerald-700">Finance and resources</p><h1 className="mt-2 text-4xl font-semibold">ERP</h1><div className="mt-8 grid gap-4 sm:grid-cols-3">{[["Revenue","€142 480"],["Receivables","€38 200"],["Settlement reserve","€912 000"]].map(([label,value])=><article className="rounded-2xl border bg-white p-5" key={label}><small className="text-slate-500">{label}</small><strong className="mt-2 block text-2xl">{value}</strong></article>)}</div><div className="mt-6 overflow-hidden rounded-3xl border bg-white"><table className="w-full min-w-[720px] text-left"><tbody>{entries.map((row)=><tr className="border-t first:border-0" key={row[0]}>{row.map((cell)=><td className="px-5 py-4" key={cell}>{cell}</td>)}</tr>)}</tbody></table></div></div>;
}
