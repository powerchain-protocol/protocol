export interface RpcEndpoint { url: string; websocketUrl?: string; weight?: number; }
export interface RpcRequestOptions { signal?: AbortSignal; timeoutMs?: number; retries?: number; }
export class RpcError extends Error { constructor(message: string, readonly code: number | string = "RPC_ERROR", readonly data?: unknown) { super(message); this.name = "RpcError"; } }
export class RpcClient {
  private cursor = 0;
  constructor(readonly endpoints: readonly RpcEndpoint[], private readonly fetcher: typeof fetch = fetch) { if (!endpoints.length) throw new Error("At least one RPC endpoint is required"); }
  async request<T>(method: string, params: readonly unknown[] = [], options: RpcRequestOptions = {}): Promise<T> {
    const retries = Math.max(0, options.retries ?? this.endpoints.length - 1);
    let lastError: unknown;
    for (let attempt = 0; attempt <= retries; attempt++) {
      const endpoint = this.endpoints[(this.cursor + attempt) % this.endpoints.length]!;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 12_000);
      try {
        const response = await this.fetcher(endpoint.url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ jsonrpc: "2.0", id: crypto.randomUUID(), method, params }), signal: options.signal ?? controller.signal });
        if (!response.ok) throw new RpcError(`RPC HTTP ${response.status}`, response.status);
        const payload = await response.json() as { result?: T; error?: { code: number; message: string; data?: unknown } };
        if (payload.error) throw new RpcError(payload.error.message, payload.error.code, payload.error.data);
        this.cursor = (this.cursor + attempt) % this.endpoints.length;
        return payload.result as T;
      } catch (error) { lastError = error; } finally { clearTimeout(timeout); }
    }
    throw lastError instanceof Error ? lastError : new RpcError("All RPC endpoints failed");
  }
  async health(): Promise<Array<{ url: string; ok: boolean; latencyMs: number }>> { return Promise.all(this.endpoints.map(async ({url}) => { const started=Date.now(); try { await new RpcClient([{url}], this.fetcher).request("getHealth",[],{retries:0,timeoutMs:4_000}); return {url,ok:true,latencyMs:Date.now()-started}; } catch { return {url,ok:false,latencyMs:Date.now()-started}; } })); }
}
