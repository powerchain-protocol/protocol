
import type {PurchaseTier} from "@/types/pricing";

export const PURCHASE_TIERS:PurchaseTier[]=[
  {
    id:"developer",name:"Developer",description:"Sandbox APIs and local integration testing.",
    monthlyUsd:0,yearlyUsd:0,seats:1,apiRequestsPerMonth:10000,
    features:["Sandbox access","Basic API access","Rate-limit dashboard","Community support"],
    companyAccess:["Developer workspace"],prosumerAccess:false
  },
  {
    id:"starter",name:"Starter",description:"For pilot projects and small renewable teams.",
    monthlyUsd:49,yearlyUsd:490,yearlySavingsPercent:17,seats:5,apiRequestsPerMonth:100000,
    features:["Hosted checkout","Wallet integration","Marketplace access","Standard analytics","Email support"],
    companyAccess:["Company dashboard","Billing","Energy overview"],prosumerAccess:true
  },
  {
    id:"growth",name:"Growth",description:"For scaling companies with operational workflows.",
    monthlyUsd:299,yearlyUsd:2990,yearlySavingsPercent:17,seats:25,apiRequestsPerMonth:1000000,popular:true,
    features:["Advanced analytics","CRM and ERP","AI operations","Custom integrations","Priority support"],
    companyAccess:["Full company management","Users and roles","Prosumer management","Payments","Integrations"],prosumerAccess:true
  },
  {
    id:"enterprise",name:"Enterprise",description:"For custom infrastructure, compliance, and private deployments.",
    monthlyUsd:null,yearlyUsd:null,seats:null,apiRequestsPerMonth:null,
    features:["Unlimited API requests","Private infrastructure","Custom SLA","Dedicated support","Advanced security"],
    companyAccess:["All services","Custom roles","Private environments"],prosumerAccess:true
  }
];
