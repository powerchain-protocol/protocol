import { execFileSync } from "node:child_process";
const patterns=["AKIA[0-9A-Z]{16}","-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----","sk-[A-Za-z0-9]{20,}"];
let found=false;
for(const pattern of patterns){
  try {
    const args=["-RInE","--exclude-dir=.git","--exclude-dir=node_modules","--exclude-dir=.next","--exclude=.env.example","--",pattern,"."];
    const out=execFileSync("grep",args,{encoding:"utf8"});
    if(out.trim()){console.error(out);found=true}
  } catch(e) { if(e.status!==1) throw e }
}
if(found) process.exit(1);
console.log("Secret scan passed");
