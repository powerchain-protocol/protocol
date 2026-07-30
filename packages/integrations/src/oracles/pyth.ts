
export class PythPriceClient{
 constructor(private readonly baseUrl="https://hermes.pyth.network"){}
 async latestPriceFeeds(ids:string[]){const params=new URLSearchParams();for(const id of ids)params.append("ids[]",id);const response=await fetch(`${this.baseUrl}/v2/updates/price/latest?${params}`);if(!response.ok)throw new Error(`Pyth returned ${response.status}.`);return response.json()}
}
