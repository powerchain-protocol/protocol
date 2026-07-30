import { randomUUID } from "node:crypto";

type Challenge = { id: string; address: string; network: "solana"|"sui"; message: string; expiresAt: number; used: boolean };
const challenges = new Map<string, Challenge>();

export function createChallenge(input: { address: string; network: "solana"|"sui"; domain: string; statement: string; ttlSeconds: number }) {
  const id = randomUUID();
  const issuedAt = new Date().toISOString();
  const expiresAt = Date.now() + input.ttlSeconds * 1000;
  const message = `${input.domain} wants you to sign in with your ${input.network} account:\n${input.address}\n\n${input.statement}\n\nURI: https://${input.domain}\nVersion: 1\nNonce: ${id}\nIssued At: ${issuedAt}\nExpiration Time: ${new Date(expiresAt).toISOString()}`;
  const challenge = { id, address: input.address, network: input.network, message, expiresAt, used: false };
  challenges.set(id, challenge);
  return challenge;
}

export function consumeChallenge(id: string, address: string, network: "solana"|"sui", message: string) {
  const challenge = challenges.get(id);
  if (!challenge || challenge.used || challenge.expiresAt < Date.now()) return null;
  if (challenge.address !== address || challenge.network !== network || challenge.message !== message) return null;
  challenge.used = true;
  return challenge;
}
