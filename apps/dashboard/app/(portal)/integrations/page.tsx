
import { IntegrationCard } from "@/components/company/integration-card";

const integrations=[
  ["SAP S/4HANA","ERP","connected","Business partners, installations, billing, and meter readings."],
  ["Salesforce","CRM","available","Enterprise accounts, opportunities, and customer workflows."],
  ["Supabase","Data and auth","connected","Authentication, profiles, storage, and realtime data."],
  ["Cloudflare","Security and edge","attention","WAF, edge routing, Workers, and API rate limiting."]
] as const;

export default function IntegrationsPage(){
  return <div><p className="text-xs font-black uppercase tracking-wider text-emerald-700">Company platform</p><h1 className="mt-2 text-4xl font-semibold">Integrations</h1><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{integrations.map(([name,category,status,description])=><IntegrationCard key={name} name={name} category={category} status={status} description={description}/>)}</div></div>;
}
