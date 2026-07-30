import { OperationCard } from "../../components/protocol/operation-card";
export const metadata={title:"Checkout | Powerchain"};
export default function Page(){return <main style={{"maxWidth":960,"margin":"0 auto","padding":"64px 24px"}}><h1>Checkout</h1><p>Create wallet checkout sessions and confirm merchant settlements.</p><OperationCard title="Checkout" description="Devnet-ready protocol interface. Production program IDs must be configured and verified before use." href="/dashboard" /></main>}
