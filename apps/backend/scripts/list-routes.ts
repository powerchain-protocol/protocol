
import { buildServer } from "../src/server.js";

const app = await buildServer();
await app.ready();
console.log(app.printRoutes({ commonPrefix: false }));
await app.close();
