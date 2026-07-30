
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
import { TOKENS } from "@/tokens";
import type { TokenBalance } from "@/types/balances";

const knownMints = new Map(
  Object.values(TOKENS)
    .filter((token) => token.chain === "solana" && token.mint)
    .map((token) => [token.mint, token])
);

export async function fetchSolanaBalances(address: string, rpcUrl?: string): Promise<TokenBalance[]> {
  const owner = new PublicKey(address);
  const connection = new Connection(
    rpcUrl ?? process.env.SOLANA_RPC_URL ?? process.env.NEXT_PUBLIC_SOLANA_RPC ?? "https://api.mainnet-beta.solana.com",
    "confirmed"
  );

  const [lamports, classic, token2022] = await Promise.all([
    connection.getBalance(owner, "confirmed"),
    connection.getParsedTokenAccountsByOwner(owner, { programId: TOKEN_PROGRAM_ID }, "confirmed"),
    connection.getParsedTokenAccountsByOwner(owner, { programId: TOKEN_2022_PROGRAM_ID }, "confirmed")
  ]);

  const balances: TokenBalance[] = [];

  if (lamports > 0) {
    balances.push({
      id: `solana:${address}:SOL`,
      symbol: "SOL",
      mint: TOKENS.SOL.mint,
      chain: "solana",
      amount: String(lamports / LAMPORTS_PER_SOL),
      decimals: 9,
      valueGbp: 0,
      updatedAt: new Date().toISOString()
    });
  }

  for (const account of [...classic.value, ...token2022.value]) {
    const info = account.account.data.parsed?.info;
    const mint = String(info?.mint ?? "");
    const tokenAmount = info?.tokenAmount;
    const rawAmount = String(tokenAmount?.amount ?? "0");
    if (!mint || rawAmount === "0") continue;

    const token = knownMints.get(mint);
    balances.push({
      id: `solana:${address}:${mint}`,
      symbol: token?.symbol ?? mint.slice(0, 6),
      mint,
      chain: "solana",
      amount: String(tokenAmount?.uiAmountString ?? "0"),
      decimals: Number(tokenAmount?.decimals ?? 0),
      valueGbp: 0,
      updatedAt: new Date().toISOString()
    });
  }

  return balances;
}
