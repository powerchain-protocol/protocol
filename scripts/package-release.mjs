import { spawnSync } from "node:child_process"; import { readFileSync, mkdirSync } from "node:fs";
const pkg=JSON.parse(readFileSync("package.json","utf8")); mkdirSync("artifacts",{recursive:true}); const out=`artifacts/${pkg.name.replace(/^@/,"").replaceAll("/","-")}-${pkg.version}.tar.gz`;
const args=["-czf",out,"--exclude=.git","--exclude=node_modules","--exclude=.next","--exclude=dist","--exclude=build","--exclude=coverage","--exclude=target","--exclude=artifacts","--exclude=.env","--exclude=.env.*.local","."];
const r=spawnSync("tar",args,{stdio:"inherit"}); if(r.status!==0)process.exit(r.status??1); console.log(`Created ${out}`);
