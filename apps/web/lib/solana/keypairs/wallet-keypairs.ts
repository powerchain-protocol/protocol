import { Keypair } from "@solana/web3.js";

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const VAULT_KEY = "powerchain.solana.keypairs.v1";
const PBKDF2_ITERATIONS = 310_000;

export type EncryptedKeypairRecord = {
  id: string;
  publicKey: string;
  label: string;
  createdAt: string;
  encryptedSecretKey: string;
  iv: string;
  salt: string;
};

export type KeypairVault = {
  version: 1;
  network: "devnet" | "testnet" | "mainnet-beta";
  records: EncryptedKeypairRecord[];
  updatedAt: string;
};

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function base64ToBytes(value: string): Uint8Array {
  const binary = atob(value);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function deriveKey(passphrase: string, salt: Uint8Array): Promise<CryptoKey> {
  if (passphrase.length < 12) throw new Error("Use a passphrase with at least 12 characters.");
  const material = await crypto.subtle.importKey("raw", encoder.encode(passphrase), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: salt as BufferSource, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

export async function createEncryptedKeypair(label: string, passphrase: string): Promise<EncryptedKeypairRecord> {
  if (!globalThis.crypto?.subtle) throw new Error("Secure Web Crypto is unavailable in this browser.");
  const keypair = Keypair.generate();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encryptionKey = await deriveKey(passphrase, salt);
  const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, encryptionKey, keypair.secretKey);
  keypair.secretKey.fill(0);
  return {
    id: crypto.randomUUID(),
    publicKey: keypair.publicKey.toBase58(),
    label: label.trim() || "Solana wallet",
    createdAt: new Date().toISOString(),
    encryptedSecretKey: bytesToBase64(new Uint8Array(encrypted)),
    iv: bytesToBase64(iv),
    salt: bytesToBase64(salt),
  };
}

export async function unlockKeypair(record: EncryptedKeypairRecord, passphrase: string): Promise<Keypair> {
  const salt = base64ToBytes(record.salt);
  const iv = base64ToBytes(record.iv);
  const encryptionKey = await deriveKey(passphrase, salt);
  try {
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: iv as BufferSource },
      encryptionKey,
      base64ToBytes(record.encryptedSecretKey) as BufferSource,
    );
    const secret = new Uint8Array(decrypted);
    const keypair = Keypair.fromSecretKey(secret);
    secret.fill(0);
    if (keypair.publicKey.toBase58() !== record.publicKey) throw new Error("Vault integrity check failed.");
    return keypair;
  } catch {
    throw new Error("Unable to unlock the keypair. Check the passphrase and vault integrity.");
  }
}

export function loadLocalVault(): KeypairVault {
  if (typeof window === "undefined") return { version: 1, network: "devnet", records: [], updatedAt: new Date(0).toISOString() };
  const raw = localStorage.getItem(VAULT_KEY);
  if (!raw) return { version: 1, network: "devnet", records: [], updatedAt: new Date().toISOString() };
  const parsed = JSON.parse(raw) as KeypairVault;
  if (parsed.version !== 1 || !Array.isArray(parsed.records)) throw new Error("Unsupported keypair vault format.");
  return parsed;
}

export function saveLocalVault(vault: KeypairVault): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(VAULT_KEY, JSON.stringify({ ...vault, updatedAt: new Date().toISOString() }));
}

export function downloadEncryptedVault(vault: KeypairVault): void {
  const blob = new Blob([JSON.stringify(vault, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `powerchain-keypairs-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function encodeSecretForTemporaryExport(keypair: Keypair): string {
  return JSON.stringify(Array.from(keypair.secretKey));
}
