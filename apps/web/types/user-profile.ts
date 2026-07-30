
export type UserEnvironmentPreference="mock"|"devnet"|"mainnet";
export type UserDataProfile={
 id:string;email:string;displayName:string;companyId?:string;prosumerId?:string;
 environment:UserEnvironmentPreference;acceptedMarketDataDisclaimerAt?:string;
};
