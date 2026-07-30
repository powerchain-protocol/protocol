"use client";
import { useState } from "react";
import { LogOut, Wallet } from "lucide-react";
import { useAuthSession } from "@/hooks/use-auth-session";
import { WalletConnectModal } from "@/components/wallet/wallet-connect-modal";
export function AuthMenu() {
  const { session, loading, signOut } = useAuthSession(); const [walletOpen,setWalletOpen]=useState(false);
  return <div className="flex items-center gap-2">{session ? <><span className="hidden text-sm text-neutral-600 dark:text-neutral-300 sm:inline">{session.user.name ?? session.user.email}</span><button onClick={()=>void signOut()} className="rounded-lg border px-3 py-2 text-sm"><LogOut className="mr-2 inline" size={15}/>Sign out</button></> : <a href="/login" className="rounded-lg border px-3 py-2 text-sm">{loading ? "Checking…" : "Sign in"}</a>}<button onClick={()=>setWalletOpen(true)} className="rounded-lg bg-emerald-800 px-3 py-2 text-sm text-white"><Wallet className="mr-2 inline" size={15}/>Wallet</button><WalletConnectModal open={walletOpen} onOpenChange={setWalletOpen}/></div>;
}
