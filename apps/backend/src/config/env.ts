
import {z} from "zod";
const boolean=z.enum(["true","false"]).transform(value=>value==="true");
const schema=z.object({
 NODE_ENV:z.enum(["development","test","production"]).default("development"),
 HOST:z.string().default("0.0.0.0"),PORT:z.coerce.number().int().positive().default(4000),
 DATABASE_URL:z.string().min(1).optional(),API_PUBLIC_URL:z.string().url().default("http://localhost:4000"),
 WEB_URL:z.string().url().default("http://localhost:3000"),DASHBOARD_URL:z.string().url().default("http://localhost:3001"),
 SOLANA_RPC_URL:z.string().url().default("https://api.mainnet-beta.solana.com"),
 SUI_RPC_URL:z.string().url().default("https://fullnode.mainnet.sui.io:443"),
 HELIUS_API_KEY:z.string().optional(),JUPITER_API_KEY:z.string().optional(),BIRDEYE_API_KEY:z.string().optional(),
 ENABLE_SWAGGER:boolean.default("true"),ALLOW_MOCK_DATA:boolean.default("true"),
 REQUEST_TIMEOUT_MS:z.coerce.number().positive().default(15000),
 WEBHOOK_SIGNING_SECRET:z.string().min(32).optional(),
 JWT_SECRET:z.string().min(32).optional(),
 RATE_LIMIT_MAX:z.coerce.number().int().positive().default(120),
 RATE_LIMIT_WINDOW:z.string().default("1 minute")
});
export const env=schema.parse(process.env);
export type Environment=typeof env;
