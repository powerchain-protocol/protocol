import type{CarbonCredit}from"./types.js";
export const canRetireCredit=(c:CarbonCredit,t:number)=>c.status!=="retired"&&t>0&&t<=c.tonnes;
export const retirementReference=(id:string,wallet:string,at=new Date())=>`PC-CARBON-${id}-${wallet.slice(0,8)}-${at.toISOString().slice(0,10)}`;
