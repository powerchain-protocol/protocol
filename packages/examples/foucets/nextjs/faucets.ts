import { PublicKey } from "@solana/web3.js";
import {
  createConfiguredDevnetFaucet,
  sendDevnetFaucetClaim,
} from "@powerchain/foucets-program";

/**
 * Server-side Next.js example. Never import this function into a client component,
 * because the configured faucet reads its signer from server environment variables.
 */
export async function claimExample(walletAddress: string) {
  const wallet = new PublicKey(walletAddress);
  const configured = createConfiguredDevnetFaucet();
  return sendDevnetFaucetClaim({
    ...configured,
    recipient: wallet,
    tokenProgram: "token-2022",
  });
}
