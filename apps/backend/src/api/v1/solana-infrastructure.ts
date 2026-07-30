
import type {FastifyInstance} from "fastify";
import {HeliusClient,JupiterApiClient,fetchMetaplexMetadata,createRpcConfiguration} from "@powerchain/solana-infrastructure";
import {solanaInfrastructureConfig} from "../../config/solana.js";

export async function solanaInfrastructureRoutes(app:FastifyInstance){
 app.get("/solana/networks",async()=>({data:[
  {id:"mainnet-beta",label:"Solana Mainnet",providers:["solana-public","helius","custom"]},
  {id:"devnet",label:"Solana Devnet",providers:["solana-public","helius","custom"]},
  {id:"testnet",label:"Solana Testnet",providers:["solana-public","custom"]},
  {id:"localnet",label:"Local Validator",providers:["local","custom"]}
 ]}));

 app.post<{Body:{network:any;provider:any;customUrl?:string}}>("/solana/rpc/validate",async(request,reply)=>{
  try{
   const configuration=createRpcConfiguration({
    ...request.body,heliusApiKey:request.body.provider==="helius"?solanaInfrastructureConfig.heliusApiKey:undefined
   });
   if(configuration.custom){
    const host=new URL(configuration.httpUrl).hostname;
    const allowed=solanaInfrastructureConfig.allowedCustomRpcHosts.some(value=>host===value||host.endsWith(`.${value}`));
    if(process.env.NODE_ENV==="production"&&!allowed)return reply.code(403).send({error:{code:"CUSTOM_RPC_HOST_NOT_ALLOWED"}});
   }
   return {data:{valid:true,configuration:{...configuration,apiKey:undefined}}};
  }catch(error){return reply.code(400).send({error:{code:"INVALID_RPC_CONFIGURATION",message:error instanceof Error?error.message:"Invalid RPC"}})}
 });

 app.get<{Params:{mint:string}}>("/solana/metadata/:mint",async(request)=>{
  return {data:await fetchMetaplexMetadata({rpcUrl:solanaInfrastructureConfig.publicRpcUrl,mint:request.params.mint})};
 });

 app.get<{Params:{owner:string}}>("/helius/assets/:owner",async(request,reply)=>{
  if(!solanaInfrastructureConfig.heliusApiKey)return reply.code(503).send({error:{code:"HELIUS_NOT_CONFIGURED"}});
  const client=new HeliusClient({apiKey:solanaInfrastructureConfig.heliusApiKey});
  return {data:await client.getAssetsByOwner(request.params.owner)};
 });

 app.get("/jupiter/quote",async(request:any,reply)=>{
  const client=new JupiterApiClient({apiKey:solanaInfrastructureConfig.jupiterApiKey});
  try{return {data:await client.quote({...request.query,slippageBps:Number(request.query.slippageBps??50)})}}
  catch(error){return reply.code(502).send({error:{code:"JUPITER_QUOTE_FAILED",message:error instanceof Error?error.message:"Quote failed"}})}
 });
}
