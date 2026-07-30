
import {AccessGuard} from "@/components/access/access-guard";
export default function Page(){return <AccessGuard permission="dashboard.read"><div><p className="text-xs font-black uppercase tracking-wider text-emerald-700">Intelligence</p><h1 className="mt-2 text-4xl font-semibold">Analytics</h1><div className="mt-8 flex h-80 items-end gap-3 rounded-3xl border bg-white p-6">{[36,52,48,66,58,76,70,88,79,94,84,100].map((h,i)=><div className="flex-1 rounded-t-xl bg-emerald-600" key={i} style={{height:`${h}%`}}/>)}</div></div></AccessGuard>}
