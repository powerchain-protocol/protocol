
import {z} from "zod";
export const solarPanelRentalSchema=z.object({
 id:z.string(),userId:z.string(),assetId:z.string(),panelCount:z.number().int().positive(),months:z.number().int().min(1).max(240),
 monthlyPanelPriceUsd:z.number().positive(),totalUsd:z.number().positive(),status:z.enum(["reserved","active","paused","completed","cancelled"]),
 startAt:z.string(),endAt:z.string()
});
export type SolarPanelRental=z.infer<typeof solarPanelRentalSchema>;
export function calculateRentalQuote(input:{panelCount:number;months:number;monthlyPanelPriceUsd:number}){
 if(input.panelCount<=0||input.months<=0||input.monthlyPanelPriceUsd<=0)throw new Error("Rental values must be positive.");
 const subtotalUsd=input.panelCount*input.months*input.monthlyPanelPriceUsd;const serviceFeeUsd=subtotalUsd*.025;
 return {subtotalUsd,serviceFeeUsd,totalUsd:subtotalUsd+serviceFeeUsd,monthlyUsd:input.panelCount*input.monthlyPanelPriceUsd};
}
