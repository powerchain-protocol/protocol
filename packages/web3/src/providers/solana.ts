import { jsonRpc, type RpcRequestOptions } from "./base";

export type SolanaCommitment = "processed" | "confirmed" | "finalized";
export interface SolanaProviderConfig {
  rpcUrls: string[];
  commitment?: SolanaCommitment;
  timeoutMs?: number;
}

export class SolanaProvider {
  private cursor = 0;
  constructor(private readonly config: SolanaProviderConfig) {
    if (!config.rpcUrls.length) throw new TypeError("At least one Solana RPC URL is required");
  }

  private async request<T>(method: string, params: unknown[] = [], options: RpcRequestOptions = {}): Promise<T> {
    const failures: unknown[] = [];
    for (let attempt = 0; attempt < this.config.rpcUrls.length; attempt += 1) {
      const index = (this.cursor + attempt) % this.config.rpcUrls.length;
      const endpoint = this.config.rpcUrls[index]!;
      try {
        const result = await jsonRpc<T>("solana", endpoint, method, params, {
          timeoutMs: options.timeoutMs ?? this.config.timeoutMs,
          signal: options.signal,
        });
        this.cursor = index;
        return result;
      } catch (error) {
        failures.push(error);
      }
    }
    throw new AggregateError(failures, `All ${this.config.rpcUrls.length} Solana RPC endpoints failed`);
  }

  getHealth(options?: RpcRequestOptions) { return this.request<string>("getHealth", [], options); }
  getLatestBlockhash(options?: RpcRequestOptions) {
    return this.request<{ context: { slot: number }; value: { blockhash: string; lastValidBlockHeight: number } }>(
      "getLatestBlockhash",
      [{ commitment: this.config.commitment ?? "confirmed" }],
      options,
    );
  }
  getBalance(address: string, options?: RpcRequestOptions) {
    return this.request<{ context: { slot: number }; value: number }>(
      "getBalance",
      [address, { commitment: this.config.commitment ?? "confirmed" }],
      options,
    );
  }
  simulateTransaction(base64Transaction: string, options?: RpcRequestOptions) {
    return this.request("simulateTransaction", [base64Transaction, { encoding: "base64", sigVerify: false }], options);
  }
}
