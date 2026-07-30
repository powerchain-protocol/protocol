
import {calculateMarketplaceOrder,type MarketplaceOrderInput} from "@powerchain/marketplace";
export class MarketplaceService {
 quote(input:MarketplaceOrderInput){return {...input,...calculateMarketplaceOrder(input),quotedAt:new Date().toISOString()}}
}
