
export class EmbeddedWalletClient{constructor(private apiKey:string){}async createWallet(userId:string){if(!this.apiKey)throw new Error("Embedded wallet API key missing");return{userId,address:`PwrcEmbedded${Buffer.from(userId).toString("hex").slice(0,20)}`,custody:"embedded"}}}
