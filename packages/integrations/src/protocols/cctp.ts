
export class CircleCctpClient{
 constructor(private readonly input:{apiKey?:string;baseUrl?:string}={}){}
 private get base(){return this.input.baseUrl??"https://iris-api.circle.com"}
 async getAttestation(messageHash:string){const response=await fetch(`${this.base}/attestations/${encodeURIComponent(messageHash)}`,{headers:this.input.apiKey?{Authorization:`Bearer ${this.input.apiKey}`}:{}});if(!response.ok)throw new Error(`CCTP attestation returned ${response.status}.`);return response.json()}
}
