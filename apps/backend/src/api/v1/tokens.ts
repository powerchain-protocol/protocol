
import type {FastifyInstance} from "fastify";import {TokenService} from "../../services/token-service.js";import {readEnvironment} from "../../lib/helpers.js";import {ok} from "../../lib/http.js";
export async function tokenRoutes(app:FastifyInstance){const service=new TokenService();
 app.get("/tokens",{schema:{tags:["Tokens"],summary:"List configured tokens"}},async(request,reply)=>ok(reply,await service.list(readEnvironment(request))));
 app.get<{Params:{symbol:string}}>("/tokens/:symbol",{schema:{tags:["Tokens"],summary:"Get token details"}},async(request,reply)=>ok(reply,await service.get(request.params.symbol,readEnvironment(request))));
}
