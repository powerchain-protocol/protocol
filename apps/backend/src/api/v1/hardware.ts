
import type {FastifyInstance} from "fastify";
export async function hardwareRoutes(app:FastifyInstance){
 app.get("/hardware",async()=>({data:[
  {id:"hw_001",type:"smart-meter",model:"PM-Edge 4",vendor:"PowerMeter",certified:true},
  {id:"hw_002",type:"gateway",model:"GridLink X2",vendor:"GridSense",certified:true}
 ]}));
}
