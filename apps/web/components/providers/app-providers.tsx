"use client";

import type { ReactNode } from "react";

import { ThemeProvider } from "./theme-provider";
import { SolanaWalletProvider } from "./solana-wallet-provider";

import { WalletProvider } from "@/context/wallet-context";
import { NetworkProvider } from "@/context/network-context";
import { PlatformServicesProvider } from "@/context/platform-services-context";

import { Toaster } from "@/components/ui/toaster";

export function AppProviders({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeProvider>
      <NetworkProvider>
        <PlatformServicesProvider>
          <SolanaWalletProvider>
            <WalletProvider>
              {children}
              <Toaster />
            </WalletProvider>
          </SolanaWalletProvider>
        </PlatformServicesProvider>
      </NetworkProvider>
    </ThemeProvider>
  );
}