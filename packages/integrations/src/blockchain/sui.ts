
import {IntegrationClient} from "../base.js";
export class SuiRpcClient extends IntegrationClient {
 constructor(input:{rpcUrl:string}){super({baseUrl:input.rpcUrl,headers:{"content-type":"application/json"}})}
 async rpc<T>(method:string,params:unknown[]=[]):Promise<T>{return this.request("",{method:"POST",body:JSON.stringify({jsonrpc:"2.0",id:crypto.randomUUID(),method,params})}) as Promise<T>}
 getAllBalances(address:string){return this.rpc("suix_getAllBalances",[address])}
}
