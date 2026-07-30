import { SuiClient } from "@mysten/sui/client";
import { SUI_NETWORKS, type SuiNetwork } from "./constants.js";
export function createPowerChainSuiClient(network: SuiNetwork = "devnet", rpcUrl?: string): SuiClient {
  return new SuiClient({ url: rpcUrl ?? SUI_NETWORKS[network] });
}
export async function getOwnedPowerChainObjects(client: SuiClient, owner: string, packageId: string) {
  return client.getOwnedObjects({ owner, filter: { Package: packageId }, options: { showContent: true, showType: true } });
}
