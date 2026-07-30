import { readFileSync } from "node:fs";
JSON.parse(readFileSync("vercel.json","utf8"));
const next=readFileSync("apps/web/next.config.ts","utf8");
if(!next.includes("useTypeScriptCli: true"))throw new Error("Next TypeScript CLI support is disabled");
if(next.includes('destination: docsUrl'))throw new Error("Internal docs must not redirect externally");
console.log("Next.js and Vercel configuration check passed.");
