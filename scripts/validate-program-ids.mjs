const names=["TOKEN","SWAP","BRIDGE","CHECKOUT","PAYMENTS","ESCROW","CROWDFUNDING"];
let failed=false;
for(const name of names){const key=`NEXT_PUBLIC_POWERCHAIN_${name}_PROGRAM_ID`;const value=process.env[key];if(!value){console.warn(`WARN ${key} is not configured`);continue;}if(!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(value)){console.error(`ERROR ${key} is not a valid base58 public key`);failed=true;}}
if(failed)process.exit(1);console.log("Program ID configuration checked.");
