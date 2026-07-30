
export type RenewableTokenUseCase=
 |"pool-contribution"|"solar-rental"|"energy-payment"|"meter-reward"
 |"governance"|"maintenance-reserve"|"carbon-settlement";
export const renewableTokenUseCases:{id:RenewableTokenUseCase;title:string;description:string;requiresMainnet:boolean}[]=[
 {id:"pool-contribution",title:"Renewable pool contribution",description:"Contribute PWRC or supported settlement assets to renewable infrastructure pools.",requiresMainnet:true},
 {id:"solar-rental",title:"Solar panel rental",description:"Reserve productive panel capacity and settle recurring rental obligations.",requiresMainnet:true},
 {id:"energy-payment",title:"Energy settlement",description:"Settle metered energy purchases between producers, prosumers, and buyers.",requiresMainnet:true},
 {id:"meter-reward",title:"Meter rewards",description:"Reward verified generation, flexibility, and high-quality telemetry.",requiresMainnet:false},
 {id:"governance",title:"Governance",description:"Vote on pool parameters, treasury allocation, and ecosystem proposals.",requiresMainnet:true},
 {id:"maintenance-reserve",title:"Maintenance reserve",description:"Fund planned maintenance and asset lifecycle obligations.",requiresMainnet:true},
 {id:"carbon-settlement",title:"Carbon settlement",description:"Pay for verified carbon issuance, transfer, and retirement.",requiresMainnet:true}
];
