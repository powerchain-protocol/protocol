
import {z} from "zod";

export const solanaNetworkSchema=z.enum(["mainnet-beta","devnet","testnet","localnet","custom"]);
export type SolanaNetwork=z.infer<typeof solanaNetworkSchema>;

export type RpcProviderId="solana-public"|"helius"|"custom"|"local";

export type SolanaRpcConfiguration={
  network:SolanaNetwork;
  provider:RpcProviderId;
  httpUrl:string;
  websocketUrl?:string;
  apiKey?:string;
  label:string;
  custom:boolean;
};

const publicUrls:Record<Exclude<SolanaNetwork,"custom">,string>={
  "mainnet-beta":"https://api.mainnet-beta.solana.com",
  devnet:"https://api.devnet.solana.com",
  testnet:"https://api.testnet.solana.com",
  localnet:"http://127.0.0.1:8899"
};

export function createRpcConfiguration(input:{
  network:SolanaNetwork;
  provider?:RpcProviderId;
  customUrl?:string;
  heliusApiKey?:string;
}):SolanaRpcConfiguration{
  if(input.network==="custom"){
    if(!input.customUrl)throw new Error("A custom RPC URL is required.");
    const url=new URL(input.customUrl);
    if(!["http:","https:"].includes(url.protocol))throw new Error("Custom RPC must use HTTP or HTTPS.");
    return {network:"custom",provider:"custom",httpUrl:url.toString(),label:"Custom RPC",custom:true};
  }

  if(input.provider==="helius"){
    if(!input.heliusApiKey)throw new Error("A Helius API key is required.");
    const cluster=input.network==="mainnet-beta"?"mainnet":input.network;
    return {
      network:input.network,
      provider:"helius",
      httpUrl:`https://${cluster}.helius-rpc.com/?api-key=${encodeURIComponent(input.heliusApiKey)}`,
      websocketUrl:`wss://${cluster}.helius-rpc.com/?api-key=${encodeURIComponent(input.heliusApiKey)}`,
      label:`Helius ${input.network}`,
      custom:false
    };
  }

  return {
    network:input.network,
    provider:input.network==="localnet"?"local":"solana-public",
    httpUrl:publicUrls[input.network],
    label:input.network==="localnet"?"Local validator":`Solana ${input.network}`,
    custom:false
  };
}

export function redactRpcUrl(url:string){
  try{
    const parsed=new URL(url);
    if(parsed.searchParams.has("api-key"))parsed.searchParams.set("api-key","••••••••");
    return parsed.toString();
  }catch{return "Invalid RPC URL";}
}
