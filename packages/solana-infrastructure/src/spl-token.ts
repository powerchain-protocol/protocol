
import {Connection,PublicKey,Transaction} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,TOKEN_2022_PROGRAM_ID,getAssociatedTokenAddressSync,
  createAssociatedTokenAccountInstruction,createTransferCheckedInstruction,getMint
} from "@solana/spl-token";

export async function inspectMint(input:{connection:Connection;mint:string;token2022?:boolean}){
  const programId=input.token2022?TOKEN_2022_PROGRAM_ID:TOKEN_PROGRAM_ID;
  const mint=await getMint(input.connection,new PublicKey(input.mint),"confirmed",programId);
  return {
    address:input.mint,decimals:mint.decimals,supply:mint.supply.toString(),
    mintAuthority:mint.mintAuthority?.toBase58(),freezeAuthority:mint.freezeAuthority?.toBase58(),
    programId:programId.toBase58()
  };
}

export function buildSplTransfer(input:{
  mint:string;owner:string;recipient:string;amountBaseUnits:bigint;decimals:number;token2022?:boolean
}){
  if(input.amountBaseUnits<=0n)throw new Error("Token amount must be positive.");
  const owner=new PublicKey(input.owner);const recipient=new PublicKey(input.recipient);const mint=new PublicKey(input.mint);
  const programId=input.token2022?TOKEN_2022_PROGRAM_ID:TOKEN_PROGRAM_ID;
  const source=getAssociatedTokenAddressSync(mint,owner,false,programId);
  const destination=getAssociatedTokenAddressSync(mint,recipient,false,programId);
  const transaction=new Transaction();
  transaction.add(createAssociatedTokenAccountInstruction(owner,destination,recipient,mint,programId));
  transaction.add(createTransferCheckedInstruction(source,mint,destination,owner,input.amountBaseUnits,input.decimals,[],programId));
  return transaction;
}
