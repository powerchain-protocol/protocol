
import type { FastifyInstance } from "fastify";

const devices = [
  { id: "dev_meter_001", name: "Grid Meter North", category: "smart-meter", status: "online", lastSeenAt: new Date().toISOString() },
  { id: "dev_solar_002", name: "Solar Inverter 42", category: "solar-inverter", status: "online", lastSeenAt: new Date().toISOString() }
];

export async function deviceRoutes(app: FastifyInstance) {
  app.get("/iot/devices", async () => ({ data: devices }));
  app.get<{ Params: { id: string } }>("/iot/devices/:id", async (request, reply) => {
    const device = devices.find((item) => item.id === request.params.id);
    return device ? { data: device } : reply.code(404).send({ error: { code: "DEVICE_NOT_FOUND" } });
  });
}
