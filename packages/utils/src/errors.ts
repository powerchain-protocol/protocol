
export type PowerchainErrorCode=
  |"VALIDATION_ERROR"|"UNAUTHORISED"|"FORBIDDEN"|"NOT_FOUND"|"CONFLICT"
  |"RATE_LIMITED"|"UPSTREAM_UNAVAILABLE"|"NETWORK_UNAVAILABLE"
  |"INSUFFICIENT_BALANCE"|"QUOTE_EXPIRED"|"PAYMENT_FAILED"
  |"MAINNET_DATA_UNAVAILABLE"|"CONFIGURATION_ERROR"|"INTERNAL_ERROR";

export class PowerchainError extends Error{
  constructor(
    message:string,
    readonly code:PowerchainErrorCode="INTERNAL_ERROR",
    readonly status=500,
    readonly details?:Record<string,unknown>,
    options?:ErrorOptions
  ){super(message,options);this.name="PowerchainError"}
}

export function isPowerchainError(error:unknown):error is PowerchainError{
  return error instanceof PowerchainError;
}

export function toPublicError(error:unknown,requestId?:string){
  if(isPowerchainError(error))return {error:{code:error.code,message:error.message,details:error.details,requestId}};
  return {error:{code:"INTERNAL_ERROR",message:"An unexpected error occurred.",requestId}};
}
