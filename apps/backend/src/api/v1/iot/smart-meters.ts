
import type { FastifyInstance } from "fastify";

export async function smartMeterRoutes(app: FastifyInstance) {
  app.get("/iot/smart-meters", async () => ({
    data: [
      { id: "meter_oulu_001", status: "online", protocol: "DLMS", signedTelemetry: true },
      { id: "meter_hki_014", status: "online", protocol: "MQTT", signedTelemetry: true }
    ]
  }));
}
