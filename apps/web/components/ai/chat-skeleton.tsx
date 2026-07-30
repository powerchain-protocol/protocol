
export function ChatSkeleton(){return <div className="space-y-4">{[1,2,3].map(i=><div className={`h-20 animate-pulse rounded-2xl bg-slate-100 ${i%2?"mr-16":"ml-16"}`} key={i}/>)}</div>}
