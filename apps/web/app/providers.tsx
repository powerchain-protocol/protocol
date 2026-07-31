"use client";

import type { ReactNode } from "react";
import { NetworkProvider } from "@/context/network-context";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return <NetworkProvider>{children}</NetworkProvider>;
}