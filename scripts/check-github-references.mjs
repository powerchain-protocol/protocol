import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
const root=process.cwd();
const ignored=new Set([".git","node_modules",".next","dist","build","coverage"]);
const forbidden=["github.com/"+"powerchain-energy","@"+"powerchain-energy"];
const findings=[];
async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){if(ignored.has(entry.name))continue;const file=path.join(dir,entry.name);if(entry.isDirectory())await walk(file);else{let value;try{value=await readFile(file,"utf8")}catch{continue}for(const needle of forbidden)if(value.includes(needle))findings.push(`${path.relative(root,file)}: ${needle}`)}}}
await walk(root);
if(findings.length){console.error("Legacy GitHub organization references found:\n"+findings.join("\n"));process.exit(1)}
console.log("GitHub references are canonical: powerchain-protocol.");
