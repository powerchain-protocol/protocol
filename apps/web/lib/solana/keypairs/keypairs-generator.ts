import { createEncryptedKeypair, loadLocalVault, saveLocalVault, type EncryptedKeypairRecord, type KeypairVault } from "./wallet-keypairs";

export async function generateAndStoreKeypair(input: { label: string; passphrase: string; network?: KeypairVault["network"] }): Promise<EncryptedKeypairRecord> {
  const vault = loadLocalVault();
  if (vault.records.length >= 25) throw new Error("This vault has reached its 25-keypair safety limit.");
  const record = await createEncryptedKeypair(input.label, input.passphrase);
  saveLocalVault({ ...vault, network: input.network ?? vault.network, records: [record, ...vault.records] });
  return record;
}

export function removeStoredKeypair(id: string): KeypairVault {
  const vault = loadLocalVault();
  const next = { ...vault, records: vault.records.filter((record) => record.id !== id), updatedAt: new Date().toISOString() };
  saveLocalVault(next);
  return next;
}
