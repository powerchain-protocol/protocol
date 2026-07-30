import { jsonRpc, type RpcRequestOptions } from "./base";

export class SuiProvider {
  constructor(readonly rpcUrl: string, readonly timeoutMs = 15_000) {}
  getLatestCheckpointSequenceNumber(options?: RpcRequestOptions) {
    return jsonRpc<string>("sui", this.rpcUrl, "sui_getLatestCheckpointSequenceNumber", [], { timeoutMs: this.timeoutMs, ...options });
  }
  getBalance(owner: string, coinType?: string, options?: RpcRequestOptions) {
    const params = coinType ? [owner, coinType] : [owner];
    return jsonRpc<{ coinType: string; totalBalance: string }>("sui", this.rpcUrl, "suix_getBalance", params, { timeoutMs: this.timeoutMs, ...options });
  }
  getAllBalances(owner: string, options?: RpcRequestOptions) {
    return jsonRpc<Array<{ coinType: string; totalBalance: string }>>("sui", this.rpcUrl, "suix_getAllBalances", [owner], { timeoutMs: this.timeoutMs, ...options });
  }
  dryRunTransactionBlock(transactionBlockBytes: string, options?: RpcRequestOptions) {
    return jsonRpc("sui", this.rpcUrl, "sui_dryRunTransactionBlock", [transactionBlockBytes], { timeoutMs: this.timeoutMs, ...options });
  }
}
