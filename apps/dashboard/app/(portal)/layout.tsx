
import {AuthProvider} from "@/context/auth-context";import {EmbeddedWalletProvider} from "@/context/embedded-wallet-context";import {DashboardShell} from "@/components/layout/dashboard-shell";
import {SolanaWalletContext} from "@/context/solana-wallet-context";
import {DashboardNetworkProvider} from "@/context/network-context";
export default function PortalLayout({children}:{children:React.ReactNode}){return <AuthProvider><DashboardNetworkProvider><SolanaWalletContext><EmbeddedWalletProvider><DashboardShell>{children}</DashboardShell></EmbeddedWalletProvider></SolanaWalletContext></DashboardNetworkProvider></AuthProvider>}
