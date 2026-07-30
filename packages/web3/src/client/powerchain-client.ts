import { SolanaProvider, SuiProvider, CetusProvider, PythProvider } from "../providers/index";

export type PowerChainNetwork = "mainnet" | "testnet" | "devnet" | "localnet";
export interface PowerChainClientConfig {
  network?: PowerChainNetwork;
  solanaRpcUrls?: string[];
  suiRpcUrl?: string;
  timeoutMs?: number;
}

const defaults: Record<PowerChainNetwork, { solana: string; sui: string }> = {
  mainnet: { solana: "https://api.mainnet-beta.solana.com", sui: "https://fullnode.mainnet.sui.io:443" },
  testnet: { solana: "https://api.testnet.solana.com", sui: "https://fullnode.testnet.sui.io:443" },
  devnet: { solana: "https://api.devnet.solana.com", sui: "https://fullnode.devnet.sui.io:443" },
  localnet: { solana: "http://127.0.0.1:8899", sui: "http://127.0.0.1:9000" },
};

export class PowerChainClient {
  readonly network: PowerChainNetwork;
  readonly solana: SolanaProvider;
  readonly sui: SuiProvider;
  readonly cetus: CetusProvider;
  readonly pyth: PythProvider;

  constructor(config: PowerChainClientConfig = {}) {
    this.network = config.network ?? "mainnet";
    const endpoints = defaults[this.network];
    this.solana = new SolanaProvider({ rpcUrls: config.solanaRpcUrls ?? [endpoints.solana], timeoutMs: config.timeoutMs });
    this.sui = new SuiProvider(config.suiRpcUrl ?? endpoints.sui, config.timeoutMs);
    this.cetus = new CetusProvider();
    this.pyth = new PythProvider();
  }

  readonly wallet = {
    create: async () => {
      throw new Error("Wallet creation requires a platform crypto adapter. Use @powerchain/web3 keypair utilities in a trusted client runtime.");
    },
  };

  readonly payments = {
    create: async (input: { amount: number; currency: string; recipient: string }) => ({
      id: crypto.randomUUID(), status: "created" as const, ...input,
    }),
  };

  readonly exchange = {
    quote: async (input: { inputMint: string; outputMint: string; amount: number }) => ({
      ...input, route: "unresolved" as const, network: this.network,
    }),
  };
}
