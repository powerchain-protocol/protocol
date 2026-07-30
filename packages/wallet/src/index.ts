
export type WalletChain="solana"|"sui"|"base"|"bnb"; export type WalletCapability="sign-message"|"sign-transaction"|"send-transaction"|"switch-chain";
export type WalletAccount={address:string;chain:WalletChain;label?:string;capabilities:WalletCapability[]}; export type WalletBalance={asset:string;amount:string;decimals:number;usdValue?:number};
export interface WalletAdapter{name:string;connect():Promise<WalletAccount>;disconnect():Promise<void>;signMessage?(message:Uint8Array):Promise<Uint8Array>;sendTransaction?(transaction:unknown):Promise<string>;balances?(account:WalletAccount):Promise<WalletBalance[]>}
export function shortenAddress(a:string,start=5,end=4){return a.length<=start+end?a:`${a.slice(0,start)}…${a.slice(-end)}`}
