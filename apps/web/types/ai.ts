
export type ChatRole="user"|"assistant"|"system";
export type ChatMessage={id:string;role:ChatRole;content:string;createdAt:string;status?:"streaming"|"complete"|"error"};
export type AiSettings={model:"operations"|"analytics"|"developer";temperature:number;memoryEnabled:boolean;confirmActions:boolean};
export type AiMemoryItem={id:string;label:string;value:string;createdAt:string};
