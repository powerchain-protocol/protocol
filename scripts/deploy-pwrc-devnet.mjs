#!/usr/bin/env node
import fs from "node:fs";
import { Connection, Keypair, clusterApiUrl } from "@solana/web3.js";
import { createMint, getOrCreateAssociatedTokenAccount, mintToChecked, setAuthority, AuthorityType, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
const DECIMALS=9; const SUPPLY=1_000_000_000n*10n**9n;
if (process.env.POWERCHAIN_CONFIRM_DEVNET_MINT !== "YES") throw new Error("Set POWERCHAIN_CONFIRM_DEVNET_MINT=YES to create the devnet mint.");
const path=process.env.SOLANA_KEYPAIR_PATH; if(!path) throw new Error("Set SOLANA_KEYPAIR_PATH to a 64-byte keypair JSON file.");
const payer=Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fs.readFileSync(path,"utf8"))));
const connection=new Connection(process.env.SOLANA_DEVNET_RPC_URL??clusterApiUrl("devnet"),"confirmed");
if(await connection.getGenesisHash()!=="EtWTRABZaYq6iMfeYKouRu166VU2xqa1") throw new Error("Refusing to mint outside Solana devnet.");
const mint=await createMint(connection,payer,payer.publicKey,payer.publicKey,DECIMALS,undefined,{commitment:"confirmed"},TOKEN_2022_PROGRAM_ID);
const treasury=await getOrCreateAssociatedTokenAccount(connection,payer,mint,payer.publicKey,false,"confirmed",undefined,TOKEN_2022_PROGRAM_ID);
await mintToChecked(connection,payer,mint,treasury.address,payer,SUPPLY,DECIMALS,[],{commitment:"confirmed"},TOKEN_2022_PROGRAM_ID);
await setAuthority(connection,payer,mint,payer,AuthorityType.MintTokens,null,[],{commitment:"confirmed"},TOKEN_2022_PROGRAM_ID);
console.log(JSON.stringify({network:"devnet",mint:mint.toBase58(),treasury:treasury.address.toBase58(),decimals:DECIMALS,supplyTokens:"1000000000",mintAuthorityRevoked:true},null,2));
