import { OperationCard } from "../../components/protocol/operation-card";
export const metadata={title:"Bridge | Powerchain"};
export default function Page(){return <main style={{"maxWidth":960,"margin":"0 auto","padding":"64px 24px"}}><h1>Bridge</h1><p>Lock PWRC on Solana and prepare 1:1 wPWRC issuance with replay-protected messages.</p><OperationCard title="Bridge" description="Devnet-ready protocol interface. Production program IDs must be configured and verified before use." href="/dashboard" /></main>}
