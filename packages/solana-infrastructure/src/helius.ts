
export class HeliusClient{
  constructor(private readonly input:{apiKey:string;network?:"mainnet"|"devnet";fetch?:typeof fetch}){}
  private get rpcUrl(){return `https://${this.input.network??"mainnet"}.helius-rpc.com/?api-key=${encodeURIComponent(this.input.apiKey)}`}
  private async rpc<T>(method:string,params:unknown):Promise<T>{
    const response=await (this.input.fetch??fetch)(this.rpcUrl,{
      method:"POST",headers:{"content-type":"application/json"},
      body:JSON.stringify({jsonrpc:"2.0",id:crypto.randomUUID(),method,params})
    });
    if(!response.ok)throw new Error(`Helius request failed with ${response.status}.`);
    const body=await response.json() as {result?:T;error?:{message:string}};
    if(body.error)throw new Error(body.error.message);
    return body.result as T;
  }
  getAsset(id:string){return this.rpc("getAsset",{id})}
  getAssetsByOwner(ownerAddress:string,page=1,limit=100){return this.rpc("getAssetsByOwner",{ownerAddress,page,limit,displayOptions:{showFungible:true,showNativeBalance:true}})}
  searchAssets(input:Record<string,unknown>){return this.rpc("searchAssets",input)}
  getPriorityFeeEstimate(transaction:string){return this.rpc("getPriorityFeeEstimate",{transaction,options:{recommended:true}})}
}
