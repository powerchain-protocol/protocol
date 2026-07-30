
import type {AnalyticsEvent} from "@/types/analytics";
export async function trackEvent(name:string,properties:Record<string,unknown>={}):Promise<void>{const event:AnalyticsEvent={id:crypto.randomUUID(),name,properties,occurredAt:new Date().toISOString()};await fetch("/api/analytics/events",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(event),keepalive:true})}
