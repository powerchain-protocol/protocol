
export class ClientApiError extends Error{
 constructor(message:string,readonly status:number,readonly code="UNKNOWN_ERROR",readonly details?:Record<string,unknown>){super(message);this.name="ClientApiError"}
}
export function userMessage(error:unknown){if(error instanceof ClientApiError)return error.message;if(error instanceof Error)return error.message;return "Something went wrong."}
