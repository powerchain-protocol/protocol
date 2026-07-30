
import type { FastifyInstance } from "fastify";

const locations = [
  { id: "loc_solar_oulu_01", name: "Oulu Solar One", category: "solar-farm", municipality: "Oulu", latitude: 65.0121, longitude: 25.4651, status: "online" },
  { id: "loc_wind_vaasa_01", name: "Vaasa Offshore Wind", category: "wind-farm", municipality: "Vaasa", latitude: 63.0951, longitude: 21.6165, status: "online" },
  { id: "loc_grid_tampere_01", name: "Tampere Grid Hub", category: "power-station", municipality: "Tampere", latitude: 61.4978, longitude: 23.761, status: "online" },
  { id: "loc_ev_helsinki_01", name: "Helsinki EV Superhub", category: "ev-station", municipality: "Helsinki", latitude: 60.1699, longitude: 24.9384, status: "online" }
];

export async function locationRoutes(app: FastifyInstance) {
  app.get<{ Querystring: { q?: string; category?: string } }>("/locations", async (request) => {
    const query = request.query.q?.toLowerCase();
    const category = request.query.category;

    return {
      data: locations.filter((location) => {
        const matchesQuery = !query || `${location.name} ${location.municipality}`.toLowerCase().includes(query);
        const matchesCategory = !category || category === "all" || location.category === category;
        return matchesQuery && matchesCategory;
      })
    };
  });
}
