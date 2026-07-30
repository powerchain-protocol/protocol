export type SocketState = "idle" | "connecting" | "open" | "closed";
export interface ReconnectingWebSocketOptions { maxRetries?: number; baseDelayMs?: number; maxDelayMs?: number; heartbeatMs?: number; }
export class ReconnectingWebSocket {
  private socket?: WebSocket; private retries = 0; private timer?: ReturnType<typeof setTimeout>; private heartbeat?: ReturnType<typeof setInterval>; state: SocketState = "idle";
  readonly listeners = new Set<(event: MessageEvent) => void>();
  constructor(readonly url: string, readonly options: ReconnectingWebSocketOptions = {}) {}
  connect(): void { if (this.state === "open" || this.state === "connecting") return; this.state="connecting"; this.socket=new WebSocket(this.url); this.socket.onopen=()=>{this.state="open";this.retries=0;this.startHeartbeat();}; this.socket.onmessage=(event)=>this.listeners.forEach((listener)=>listener(event)); this.socket.onerror=()=>this.socket?.close(); this.socket.onclose=()=>{this.state="closed";this.stopHeartbeat();this.scheduleReconnect();}; }
  send(payload: string): void { if (this.socket?.readyState !== WebSocket.OPEN) throw new Error("WebSocket is not open"); this.socket.send(payload); }
  subscribe(listener: (event: MessageEvent)=>void): ()=>void { this.listeners.add(listener); return ()=>this.listeners.delete(listener); }
  close(): void { clearTimeout(this.timer); this.stopHeartbeat(); this.retries=this.options.maxRetries ?? 8; this.socket?.close(); this.state="closed"; }
  private scheduleReconnect(): void { const max=this.options.maxRetries ?? 8; if (this.retries>=max) return; const delay=Math.min(this.options.maxDelayMs ?? 30_000,(this.options.baseDelayMs ?? 500)*2**this.retries++); this.timer=setTimeout(()=>this.connect(),delay); }
  private startHeartbeat(): void { const interval=this.options.heartbeatMs ?? 20_000; this.heartbeat=setInterval(()=>{ if(this.socket?.readyState===WebSocket.OPEN) this.socket.send(JSON.stringify({jsonrpc:"2.0",id:"heartbeat",method:"ping"})); },interval); }
  private stopHeartbeat(): void { if(this.heartbeat) clearInterval(this.heartbeat); }
}
