import { RpcClient } from "@powerchain/core/rpc";
const urls = (process.env.NEXT_PUBLIC_SOLANA_RPC_URLS ?? process.env.NEXT_PUBLIC_SOLANA_RPC_URL ?? "https://api.devnet.solana.com").split(",").map((url)=>url.trim()).filter(Boolean);
export const solanaRpc = new RpcClient(urls.map((url)=>({url, websocketUrl:url.replace(/^http/,"ws")})));
