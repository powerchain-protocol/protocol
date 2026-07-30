
export const env={
 apiUrl:process.env.NEXT_PUBLIC_API_URL??"http://localhost:4000/api/v1",
 uploadMaxBytes:Number(process.env.NEXT_PUBLIC_UPLOAD_MAX_BYTES??"10485760"),
 embeddedWalletAppId:process.env.NEXT_PUBLIC_EMBEDDED_WALLET_APP_ID??""
} as const;
