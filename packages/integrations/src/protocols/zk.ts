
export type ZkVerificationResult={valid:boolean;proofId:string;verifiedAt:string;publicSignals:Record<string,string>};
export interface ZkVerifier{verify(input:{proof:unknown;publicSignals:Record<string,string>}):Promise<ZkVerificationResult>}
