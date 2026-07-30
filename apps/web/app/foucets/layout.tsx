import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PWRC Faucet",
  description: "Redirect to the PowerChain Solana devnet faucet portal.",
};

export default function FoucetsCompatibilityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
