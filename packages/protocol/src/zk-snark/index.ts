export interface ZkProofEnvelope {
  scheme: "groth16" | "plonk";
  proof: Uint8Array;
  publicInputs: readonly string[];
  circuitId: string;
}
export interface ZkVerifier { verify(envelope: ZkProofEnvelope): Promise<boolean>; }
export function assertProofEnvelope(value: ZkProofEnvelope): void {
  if (!value.circuitId.trim()) throw new TypeError("circuitId is required");
  if (!value.proof.byteLength) throw new TypeError("proof must not be empty");
  if (!value.publicInputs.length) throw new TypeError("publicInputs must not be empty");
}
export async function verifyWith(verifier: ZkVerifier, envelope: ZkProofEnvelope): Promise<boolean> {
  assertProofEnvelope(envelope);
  return verifier.verify(envelope);
}
