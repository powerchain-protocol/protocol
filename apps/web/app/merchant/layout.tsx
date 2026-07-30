import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merchant Dashboard",
  description: "Checkout, payment, subscription, and treasury operations for PowerChain merchants.",
};

export default function MerchantLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
