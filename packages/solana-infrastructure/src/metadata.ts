
import {createUmi} from "@metaplex-foundation/umi-bundle-defaults";
import {publicKey} from "@metaplex-foundation/umi";
import {fetchMetadataFromSeeds,mplTokenMetadata} from "@metaplex-foundation/mpl-token-metadata";

export async function fetchMetaplexMetadata(input:{rpcUrl:string;mint:string}){
  const umi=createUmi(input.rpcUrl).use(mplTokenMetadata());
  const metadata=await fetchMetadataFromSeeds(umi,{mint:publicKey(input.mint)});
  return {
    mint:input.mint,
    name:metadata.name.replace(/\0/g,"").trim(),
    symbol:metadata.symbol.replace(/\0/g,"").trim(),
    uri:metadata.uri.replace(/\0/g,"").trim(),
    sellerFeeBasisPoints:Number(metadata.sellerFeeBasisPoints),
    updateAuthority:String(metadata.updateAuthority),
    isMutable:metadata.isMutable
  };
}
