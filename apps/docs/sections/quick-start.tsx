
export function QuickStartSection(){return <section className="mt-8 grid gap-5 xl:grid-cols-[1.1fr_.9fr]"><article className="docs-panel p-7"><h2 className="text-2xl font-bold">Quick start</h2><pre className="mt-5 overflow-auto rounded-2xl bg-slate-950 p-5 text-sm text-emerald-300"><code>{`pnpm add @powerchain/checkout

import { PowerchainCheckoutClient } from "@powerchain/checkout";

const checkout = new PowerchainCheckoutClient({
  apiKey: process.env.POWERCHAIN_API_KEY
});`}</code></pre></article><article className="docs-panel p-7"><h2 className="text-2xl font-bold">Platform endpoints</h2><div className="mt-5 grid gap-3">{["https://api.powerchain.energy/api/v1","https://checkout.powerchain.energy","https://dashboard.powerchain.energy"].map(url=><code className="rounded-xl bg-slate-50 p-3 text-xs" key={url}>{url}</code>)}</div></article></section>}
