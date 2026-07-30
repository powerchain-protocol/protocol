"use client";

import { useCallback, useEffect, useState } from "react";
import { generateAndStoreKeypair, removeStoredKeypair } from "@/lib/solana/keypairs/keypairs-generator";
import { downloadEncryptedVault, loadLocalVault, type EncryptedKeypairRecord, type KeypairVault } from "@/lib/solana/keypairs/wallet-keypairs";

export function useKeypairs() {
  const [vault, setVault] = useState<KeypairVault | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try { setVault(loadLocalVault()); } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not load vault."); }
  }, []);

  const generate = useCallback(async (input: { label: string; passphrase: string }) => {
    setPending(true); setError(null);
    try {
      const record = await generateAndStoreKeypair(input);
      setVault(loadLocalVault());
      return record;
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "Keypair generation failed.";
      setError(message); throw cause;
    } finally { setPending(false); }
  }, []);

  const remove = useCallback((id: string) => setVault(removeStoredKeypair(id)), []);
  const download = useCallback(() => { if (vault) downloadEncryptedVault(vault); }, [vault]);
  return { vault, records: vault?.records ?? ([] as EncryptedKeypairRecord[]), pending, error, generate, remove, download };
}
