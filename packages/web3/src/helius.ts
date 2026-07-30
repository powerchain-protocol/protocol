
export class HeliusClient {
  constructor(private readonly apiKey: string, private readonly cluster = "mainnet") {}
  async rpc<T>(method: string, params: unknown[] = []) {
    const response = await fetch(`https://${this.cluster}.helius-rpc.com/?api-key=${this.apiKey}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: crypto.randomUUID(), method, params })
    });
    if (!response.ok) throw new Error(`Helius request failed: ${response.status}`);
    return response.json() as Promise<T>;
  }
}
