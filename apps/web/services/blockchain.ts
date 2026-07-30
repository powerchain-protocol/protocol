
import {solanaExplorerUrl} from "@powerchain/blockchain";
export async function submitSolanaTransaction(input:{serializedTransaction:string;walletAddress:string}){
 const response=await fetch("/api/transactions",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(input)});
 if(!response.ok)throw new Error("Transaction submission failed.");
 return response.json() as Promise<{data:{signature:string}}>;
}
export function transactionExplorer(signature:string){return solanaExplorerUrl(signature,process.env.NEXT_PUBLIC_SOLANA_CLUSTER==="devnet"?"devnet":"mainnet-beta")}
