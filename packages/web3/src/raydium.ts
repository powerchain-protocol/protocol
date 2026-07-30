
export class RaydiumClient {
  constructor(private readonly baseUrl = "https://api-v3.raydium.io") {}
  async getPools() {
    const response = await fetch(`${this.baseUrl}/pools/info/list?poolType=all&poolSortField=default&sortType=desc&pageSize=20&page=1`);
    if (!response.ok) throw new Error(`Raydium request failed: ${response.status}`);
    return response.json();
  }
}
