
import type {Portfolio} from "@/types/portfolio";
export const MOCK_PORTFOLIO:Portfolio={
 ownerId:"demo_user",currency:"USD",totalValueUsd:128420.44,change24hPercent:4.18,dataMode:"mock",updatedAt:new Date().toISOString(),
 disclaimer:"Mock portfolio data for interface development only.",
 assets:[
  {id:"pwrc",symbol:"PWRC",name:"Powerchain",network:"solana",kind:"token",quantity:32000000,priceUsd:.000002,valueUsd:64,change24hPercent:0,allocationPercent:.05,dataMode:"mock",availability:"available"},
  {id:"usdc",symbol:"USDC",name:"USD Coin",network:"solana",kind:"cash",quantity:18420,priceUsd:1,valueUsd:18420,change24hPercent:0,allocationPercent:14.34,dataMode:"mock",availability:"available"},
  {id:"solar",symbol:"SOLAR-FI",name:"Nordic Solar Revenue Share",network:"solana",kind:"renewable",quantity:5200,priceUsd:12.84,valueUsd:66768,change24hPercent:2.8,allocationPercent:52,dataMode:"mock",availability:"available"},
  {id:"wind",symbol:"WIND-SE",name:"Baltic Offshore Wind",network:"sui",kind:"renewable",quantity:1520,priceUsd:28.4,valueUsd:43168,change24hPercent:1.6,allocationPercent:33.61,dataMode:"mock",availability:"available"}
 ]};
