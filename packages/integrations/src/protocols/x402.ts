
export type X402Challenge={scheme:"exact";network:string;maxAmountRequired:string;resource:string;description?:string;payTo:string;asset:string;maxTimeoutSeconds:number};
export function createX402Challenge(input:Omit<X402Challenge,"scheme">):X402Challenge{return {scheme:"exact",...input}}
export function encodeX402Challenge(challenge:X402Challenge){return Buffer.from(JSON.stringify(challenge)).toString("base64")}
