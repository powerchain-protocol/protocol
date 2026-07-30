
export function formatUsd(value:number|null,digits=2){return value===null?"Unavailable":new Intl.NumberFormat("en-GB",{style:"currency",currency:"USD",maximumFractionDigits:digits}).format(value)}
export function formatToken(value:number,symbol:string){return `${new Intl.NumberFormat("en-GB",{maximumFractionDigits:8}).format(value)} ${symbol}`}
export function shortAddress(value?:string){return value&&value.length>12?`${value.slice(0,6)}…${value.slice(-4)}`:value??""}
export function explorerUrl(network:"solana"|"sui",value:string,cluster:"mainnet"|"devnet"="mainnet"){return network==="solana"?`https://explorer.solana.com/tx/${value}${cluster==="devnet"?"?cluster=devnet":""}`:`https://suiscan.xyz/${cluster}/tx/${value}`}
