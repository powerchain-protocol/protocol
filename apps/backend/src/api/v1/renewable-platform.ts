
import type {FastifyInstance} from "fastify";import {RenewableService} from "../../services/renewable-service.js";import {created,ok} from "../../lib/http.js";
export async function renewablePlatformRoutes(app:FastifyInstance){const service=new RenewableService();
 app.get("/renewable-assets",{schema:{tags:["Renewables"],summary:"List renewable assets"}},async(_r,reply)=>ok(reply,service.listAssets()));
 app.get<{Params:{id:string}}>("/renewable-assets/:id",{schema:{tags:["Renewables"],summary:"Get renewable asset"}},async(r,reply)=>ok(reply,service.getAsset(r.params.id)));
 app.get("/renewable-pools",{schema:{tags:["Renewables"],summary:"List renewable investment pools"}},async(_r,reply)=>ok(reply,service.listPools()));
 app.post<{Body:{panelCount:number;months:number;monthlyPanelPriceUsd:number}}>("/rentals/solar/quote",{schema:{tags:["Renewables"],summary:"Quote a solar panel rental"}},async(r,reply)=>ok(reply,service.quoteRental(r.body)));
 app.post<{Body:{userId:string;assetId:string;panelCount:number;months:number;monthlyPanelPriceUsd:number}}>("/rentals/solar",{schema:{tags:["Renewables"],summary:"Reserve solar panels"}},async(r,reply)=>created(reply,service.createRental(r.body)));
}
