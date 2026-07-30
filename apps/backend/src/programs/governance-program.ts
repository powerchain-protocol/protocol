
export async function buildProposalOperation(input:{proposer:string;title:string;description:string}){return{program:"powergov",instruction:"createProposal",args:input,status:"draft"}}
