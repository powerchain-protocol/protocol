
import {z} from "zod";
export const renewablePoolSchema=z.object({
 id:z.string(),name:z.string(),assetIds:z.array(z.string()).min(1),
 targetUsd:z.number().positive(),committedUsd:z.number().nonnegative(),
 annualYieldPercent:z.number().nonnegative(),status:z.enum(["draft","funding","active","settling","closed"])
});
export type RenewablePool=z.infer<typeof renewablePoolSchema>;
export function calculatePoolMetrics(pool:RenewablePool){
 const fundingPercent=Math.min(100,pool.committedUsd/pool.targetUsd*100);
 return {fundingPercent,remainingUsd:Math.max(0,pool.targetUsd-pool.committedUsd),projectedAnnualDistributionUsd:pool.committedUsd*pool.annualYieldPercent/100};
}
export function contributeToPool(pool:RenewablePool,amountUsd:number){
 if(pool.status!=="funding")throw new Error("Pool is not accepting contributions.");
 if(amountUsd<=0)throw new Error("Contribution must be positive.");
 return {...pool,committedUsd:Math.min(pool.targetUsd,pool.committedUsd+amountUsd),status:pool.committedUsd+amountUsd>=pool.targetUsd?"active":pool.status} as RenewablePool;
}
