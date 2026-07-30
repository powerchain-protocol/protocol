import { OperationCard } from "../../components/protocol/operation-card";
export const metadata={title:"Swap | Powerchain"};
export default function Page(){return <main style={{"maxWidth":960,"margin":"0 auto","padding":"64px 24px"}}><h1>Swap</h1><p>Quote and execute PWRC token swaps with exact decimal handling and slippage protection.</p><OperationCard title="Swap" description="Devnet-ready protocol interface. Production program IDs must be configured and verified before use." href="/dashboard" /></main>}
