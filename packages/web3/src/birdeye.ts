
export class BirdeyeClient {
  constructor(private readonly apiKey: string, private readonly baseUrl = "https://public-api.birdeye.so") {}
  async tokenPrice(address: string) {
    const response = await fetch(`${this.baseUrl}/defi/price?address=${encodeURIComponent(address)}`, {
      headers: { "X-API-KEY": this.apiKey, "x-chain": "solana" }
    });
    if (!response.ok) throw new Error(`Birdeye request failed: ${response.status}`);
    return response.json();
  }
}
