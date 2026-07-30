import { OperationCard } from "../../components/protocol/operation-card";
export const metadata={title:"Payments | Powerchain"};
export default function Page(){return <main style={{"maxWidth":960,"margin":"0 auto","padding":"64px 24px"}}><h1>Payments</h1><p>Manage payment intents, receipts, refunds, and settlement status.</p><OperationCard title="Payments" description="Devnet-ready protocol interface. Production program IDs must be configured and verified before use." href="/dashboard" /></main>}
