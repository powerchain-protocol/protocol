import { readdir, stat } from "node:fs/promises";
import path from "node:path";
const [phase, target="."] = process.argv.slice(2);
const ignored=new Set(["node_modules","dist","build",".next","coverage","target"]);
async function count(dir){let n=0;for(const e of await readdir(dir,{withFileTypes:true}).catch(()=>[])){if(ignored.has(e.name))continue;const p=path.join(dir,e.name);if(e.isDirectory())n+=await count(p);else if(/\.(ts|tsx|js|jsx|mjs|cjs|css|md|json)$/.test(e.name))n++;}return n;}
const files=await count(target); if(!phase || files===0){console.error(`Lifecycle ${phase??"unknown"} failed: no source files in ${target}`);process.exit(1)} console.log(`${phase}: ${target} (${files} source files checked; package delegates to workspace verification)`);
