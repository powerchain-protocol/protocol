
import {neon} from "@neondatabase/serverless";export function createNeonClient(){const url=process.env.NEON_DATABASE_URL??process.env.DATABASE_URL;if(!url)throw new Error("Database URL missing");return neon(url)}
