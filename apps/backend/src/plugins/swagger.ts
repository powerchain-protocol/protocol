
import fp from "fastify-plugin";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import {env} from "../config/env.js";
export const swaggerPlugin=fp(async app=>{
 if(!env.ENABLE_SWAGGER)return;
 await app.register(swagger,{
  openapi:{
   info:{title:"Powerchain API",description:"Energy, renewable assets, tokens, payments, swaps, bridges, portfolios, and enterprise operations.",version:"1.0.0-beta.1"},
   servers:[{url:env.API_PUBLIC_URL,description:env.NODE_ENV}],
   tags:[
    {name:"System"},{name:"Energy Marketplace"},{name:"Energy Maps"},{name:"Funding"},{name:"Exchanges"},{name:"Tokens"},{name:"Renewables"},{name:"Swaps"},{name:"Bridges"},{name:"Payments"},{name:"Portfolio"},{name:"Wallets"},{name:"Webhooks"}
   ],
   components:{securitySchemes:{bearerAuth:{type:"http",scheme:"bearer",bearerFormat:"JWT"}}}
  }
 });
 await app.register(swaggerUi,{routePrefix:"/docs/api",uiConfig:{docExpansion:"list",deepLinking:true,displayRequestDuration:true,filter:true},staticCSP:true});
 app.get("/openapi.json",{schema:{hide:true}},async()=>app.swagger());
});
