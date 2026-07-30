import {createUmi} from "@metaplex-foundation/umi-bundle-defaults";
import {mplTokenMetadata} from "@metaplex-foundation/mpl-token-metadata";
export function createPowerChainUmi(endpoint=process.env.NEXT_PUBLIC_SOLANA_RPC_URL??"https://api.devnet.solana.com"){return createUmi(endpoint).use(mplTokenMetadata())}
export interface RwaMetadataInput{name:string;symbol:string;uri:string;sellerFeeBasisPoints?:number}
export function normalizeRwaMetadata(input:RwaMetadataInput){return {...input,sellerFeeBasisPoints:input.sellerFeeBasisPoints??0,creators:null,collection:null,uses:null}}
