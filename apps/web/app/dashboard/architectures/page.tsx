import type { Metadata } from "next";
import { Architectures } from "@/components/architectures";

export const metadata: Metadata = {
  title: "Architecture | PowerChain",
  description: "PowerChain renewable energy, RWA, DePIN, IoT, Solana and Sui architecture diagrams.",
};

export default function ArchitecturesPage() {
  return <Architectures />;
}
