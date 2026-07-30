"use client";
import { useMemo } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { ModalShell } from "@/components/modals/modal-shell";
export function WalletConnectModal({open,onOpenChange}:{open:boolean;onOpenChange:(v:boolean)=>void}) {
  const network = useMemo(() => process.env.NEXT_PUBLIC_SOLANA_NETWORK ?? "devnet", []);
  return <ModalShell open={open} onOpenChange={onOpenChange} title="Connect wallet" description={`Choose a supported Solana wallet. Network: ${network}.`}>
    <div className="rounded-xl border border-black/10 bg-neutral-50 p-4 dark:border-white/10 dark:bg-neutral-900">
      <WalletMultiButton className="!w-full !justify-center !rounded-xl !bg-emerald-700 hover:!bg-emerald-800" />
      <p className="mt-3 text-xs text-neutral-500">Connecting does not grant transaction permission. Every transaction still requires wallet approval.</p>
    </div>
  </ModalShell>;
}
