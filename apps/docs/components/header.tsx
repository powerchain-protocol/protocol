
import Link from "next/link";
export function DocsHeader(){return <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-white/90 px-5 backdrop-blur-xl"><Link href="/" className="font-black tracking-[.12em]">POWERCHAIN DOCS</Link><nav className="flex gap-5 text-sm font-semibold"><Link href="/guides">Guides</Link><Link href="/api">API</Link><Link href="/sdk">SDKs</Link><a href="https://dashboard.powerchain.energy">Dashboard</a></nav></header>}
