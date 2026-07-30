import Link from "next/link";
import { ChevronRight } from "lucide-react";
const groups=[
 {title:"Start",items:[["Overview","/docs"],["SaaS platform","/docs/saas"]]},
 {title:"Architecture",items:[["System","/docs/architecture"],["Backend and API","/docs/backend"],["Contracts","/docs/contracts"]]},
 {title:"Products",items:[["Energy marketplace","/docs/energy"],["Faucets","/docs/faucets"],["Checkout","/docs/checkout"]]},
 {title:"Developer",items:[["API reference","/api-docs"],["Dashboard","/dashboard"],["SaaS console","/saas"]]},
] as const;
export function DocsSidebar(){return <aside className="hidden min-h-[calc(100vh-4rem)] border-r bg-background/95 px-4 py-6 lg:block">{groups.map(g=><section key={g.title} className="mb-7"><h2 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{g.title}</h2><nav>{g.items.map(([label,href])=><Link key={href} href={href} className="group flex items-center justify-between rounded-lg px-2 py-2 text-sm hover:bg-muted"><span>{label}</span><ChevronRight className="size-3.5 opacity-0 transition group-hover:opacity-100"/></Link>)}</nav></section>)}</aside>}
