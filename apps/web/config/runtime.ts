
export const runtimeConfig={
 apiUrl:process.env.NEXT_PUBLIC_API_URL??"http://localhost:4000/api/v1",
 developersUrl:"https://developers.powerchain.energy",
 swapUrl:"https://swap.powerchain.energy",
 defaultEnvironment:(process.env.NEXT_PUBLIC_DATA_ENVIRONMENT??"mock") as "mock"|"devnet"|"mainnet",
 allowMockFallback:process.env.NEXT_PUBLIC_ALLOW_MOCK_FALLBACK!=="false"
};
