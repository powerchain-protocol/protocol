import type {HeliusAssetsPage,HeliusNft} from "@/types/helius/non-fungible-tokens";
import type {HeliusFungibleToken} from "@/types/helius/fungible-tokens";
import {HeliusRpcClient} from "./rpc";
export async function getAssetsByOwner(owner:string,options:{page?:number;limit?:number;displayOptions?:Record<string,boolean>}={}){return HeliusRpcClient.fromEnv().call<HeliusAssetsPage<HeliusNft|HeliusFungibleToken>>("getAssetsByOwner",{ownerAddress:owner,page:options.page??1,limit:options.limit??100,displayOptions:{showFungible:true,showNativeBalance:true,...options.displayOptions}})}
export async function getAsset(id:string){return HeliusRpcClient.fromEnv().call<HeliusNft|HeliusFungibleToken>("getAsset",{id})}
export async function searchAssets(params:Record<string,unknown>){return HeliusRpcClient.fromEnv().call<HeliusAssetsPage>("searchAssets",params)}
