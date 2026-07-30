export type LogLevel = "debug" | "info" | "warn" | "error";
export type LogContext = Readonly<Record<string, unknown>>;
export interface LogEntry { timestamp: string; level: LogLevel; message: string; context?: LogContext; correlationId?: string; }
export interface Logger { debug(message: string, context?: LogContext): void; info(message: string, context?: LogContext): void; warn(message: string, context?: LogContext): void; error(message: string, context?: LogContext): void; child(context: LogContext): Logger; }
const rank: Record<LogLevel, number> = { debug: 10, info: 20, warn: 30, error: 40 };
export function createLogger(options: { level?: LogLevel; context?: LogContext; sink?: (entry: LogEntry) => void } = {}): Logger {
  const minimum = options.level ?? "info";
  const base = options.context ?? {};
  const sink = options.sink ?? ((entry) => { const line = JSON.stringify(entry); entry.level === "error" ? console.error(line) : entry.level === "warn" ? console.warn(line) : console.log(line); });
  const write = (level: LogLevel, message: string, context?: LogContext) => {
    if (rank[level] < rank[minimum]) return;
    const merged = { ...base, ...context };
    sink({ timestamp: new Date().toISOString(), level, message, context: Object.keys(merged).length ? merged : undefined, correlationId: typeof merged.correlationId === "string" ? merged.correlationId : undefined });
  };
  return { debug: (m,c)=>write("debug",m,c), info: (m,c)=>write("info",m,c), warn: (m,c)=>write("warn",m,c), error: (m,c)=>write("error",m,c), child: (context)=>createLogger({ level: minimum, context: {...base,...context}, sink }) };
}
export const logger = createLogger();
