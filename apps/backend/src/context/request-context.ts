
export type RequestContext={
 requestId:string;userId?:string;organisationId?:string;
 environment:"mock"|"devnet"|"mainnet";startedAt:number;
};
