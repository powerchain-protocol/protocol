
export default function Page(){return <><h1 className="text-4xl font-semibold">Checkout SDK</h1><pre className="mt-7 overflow-auto rounded-2xl bg-slate-950 p-6 text-emerald-300"><code>{`import { PowerchainCheckoutClient } from "@powerchain/checkout";
const client = new PowerchainCheckoutClient();
const session = await client.createSession({
  merchantId: "merchant_123",
  merchantReference: "ORDER-10042",
  lineItems: [{ id: "credit", name: "Energy credit", quantity: 250, unitAmount: 0.18, currency: "USD" }],
  settlementAssets: ["USDC", "SOL", "PWRC"],
  successUrl: "https://merchant.example/success",
  cancelUrl: "https://merchant.example/cancel"
});`}</code></pre></>}
