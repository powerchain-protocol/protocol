
export async function buildStakeOperation(input:{wallet:string;amount:bigint;validator:string}){if(input.amount<=0n)throw new Error("Stake amount must be positive");return{program:"powerstake",instructions:[{type:"deposit",wallet:input.wallet,amount:input.amount.toString()},{type:"delegate",validator:input.validator},{type:"lock",days:30}]}}
