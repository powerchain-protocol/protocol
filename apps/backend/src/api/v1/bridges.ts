
import type {FastifyInstance} from "fastify";import {BridgeService,type BridgeNetwork} from "../../services/bridge-service.js";import {ok} from "../../lib/http.js";
export async function bridgeRoutes(app:FastifyInstance){const service=new BridgeService();
 app.get("/bridges/routes",{schema:{tags:["Bridges"],summary:"List bridge routes"}},async(_r,reply)=>ok(reply,service.routes()));
 app.post<{Body:{from:BridgeNetwork;to:BridgeNetwork;asset:string;amount:number}}>("/bridges/quote",{schema:{tags:["Bridges"],summary:"Create a bridge quote"}},async(r,reply)=>ok(reply,service.quote(r.body)));
}
