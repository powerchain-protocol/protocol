
export function clamp(value:number,min:number,max:number){return Math.min(max,Math.max(min,value))}
export function safeNumber(value:unknown,fallback=0){const number=typeof value==="number"?value:Number(value);return Number.isFinite(number)?number:fallback}
export function sleep(ms:number,signal?:AbortSignal){return new Promise<void>((resolve,reject)=>{const timer=setTimeout(resolve,ms);signal?.addEventListener("abort",()=>{clearTimeout(timer);reject(signal.reason)},{once:true})})}
export function withTimeout(signal:AbortSignal|undefined,ms:number){const controller=new AbortController();const timer=setTimeout(()=>controller.abort(new Error("Request timed out.")),ms);signal?.addEventListener("abort",()=>controller.abort(signal.reason),{once:true});return {signal:controller.signal,dispose:()=>clearTimeout(timer)}}
export function createId(prefix:string){return `${prefix}_${crypto.randomUUID().replaceAll("-","").slice(0,20)}`}
export function redact(value?:string,visible=4){if(!value)return undefined;return value.length<=visible?"••••":`${"•".repeat(Math.max(4,value.length-visible))}${value.slice(-visible)}`}
export function assertNever(value:never):never{throw new Error(`Unexpected value: ${String(value)}`)}
