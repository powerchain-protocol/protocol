
export async function buildMintTokenOperation(input:{authority:string;name:string;symbol:string;uri:string;supply:bigint}){return{program:"spl-token-2022",instructions:[{type:"createMint",decimals:9,authority:input.authority},{type:"mintTo",amount:input.supply.toString()},{type:"metadata",name:input.name,symbol:input.symbol,uri:input.uri}]}}
