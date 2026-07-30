import { createPublicKey, verify, createHash } from "node:crypto";

const BASE58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
function base58Encode(bytes: Uint8Array) {
  let value = 0n;
  for (const byte of bytes) value = value * 256n + BigInt(byte);
  let output = "";
  while (value > 0n) { const remainder = Number(value % 58n); output = BASE58[remainder] + output; value /= 58n; }
  for (const byte of bytes) { if (byte !== 0) break; output = "1" + output; }
  return output || "1";
}

export function verifyWalletSignature(input: { network: "solana"|"sui"; address: string; message: string; signature: string; publicKey: string }) {
  const publicKeyBytes = Buffer.from(input.publicKey, "base64");
  const signatureBytes = Buffer.from(input.signature, "base64");
  if (input.network === "solana") {
    if (publicKeyBytes.length !== 32 || signatureBytes.length !== 64) return { valid: false, reason: "INVALID_KEY_OR_SIGNATURE_LENGTH" };
    if (base58Encode(publicKeyBytes) !== input.address) return { valid: false, reason: "ADDRESS_PUBLIC_KEY_MISMATCH" };
    const spkiPrefix = Buffer.from("302a300506032b6570032100", "hex");
    const key = createPublicKey({ key: Buffer.concat([spkiPrefix, publicKeyBytes]), format: "der", type: "spki" });
    return { valid: verify(null, Buffer.from(input.message, "utf8"), key, signatureBytes), reason: null };
  }
  const fingerprint = createHash("blake2b512").update(Buffer.concat([Buffer.from([0]), publicKeyBytes])).digest().subarray(0, 32).toString("hex");
  if (input.address.replace(/^0x/, "").toLowerCase() !== fingerprint) return { valid: false, reason: "ADDRESS_PUBLIC_KEY_MISMATCH" };
  return { valid: false, reason: "SUI_SIGNATURE_SCHEME_REQUIRES_SCHEME_FLAG" };
}
