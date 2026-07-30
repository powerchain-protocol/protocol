
const accounts=[
  ["Nordic Grid Labs","Enterprise","€482 000","Active"],
  ["Baltic Wind Cooperative","Professional","€164 000","Active"],
  ["Oulu Solar DAO","Professional","€96 500","Onboarding"]
];

export default function CrmPage(){
  return <div><p className="text-xs font-black uppercase tracking-wider text-emerald-700">Company operations</p><h1 className="mt-2 text-4xl font-semibold">CRM</h1><div className="mt-8 overflow-hidden rounded-3xl border bg-white"><table className="w-full min-w-[720px] text-left"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr>{["Account","Plan","Annual value","Status"].map((item)=><th className="px-5 py-3" key={item}>{item}</th>)}</tr></thead><tbody>{accounts.map((row)=><tr className="border-t" key={row[0]}>{row.map((cell)=><td className="px-5 py-4" key={cell}>{cell}</td>)}</tr>)}</tbody></table></div></div>;
}
