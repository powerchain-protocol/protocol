import { OperationCard } from "../../components/protocol/operation-card";
export const metadata={title:"Escrow | Powerchain"};
export default function Page(){return <main style={{"maxWidth":960,"margin":"0 auto","padding":"64px 24px"}}><h1>Escrow</h1><p>Create buyer and seller escrow agreements with deadlines and dispute controls.</p><OperationCard title="Escrow" description="Devnet-ready protocol interface. Production program IDs must be configured and verified before use." href="/dashboard" /></main>}
