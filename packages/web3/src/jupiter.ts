
export class JupiterClient {
  constructor(private readonly baseUrl = "https://api.jup.ag") {}
  async quote(inputMint: string, outputMint: string, amount: bigint, slippageBps = 50) {
    const query = new URLSearchParams({
      inputMint, outputMint, amount: amount.toString(), slippageBps: String(slippageBps)
    });
    const response = await fetch(`${this.baseUrl}/swap/v1/quote?${query}`);
    if (!response.ok) throw new Error(`Jupiter quote failed: ${response.status}`);
    return response.json();
  }
}
