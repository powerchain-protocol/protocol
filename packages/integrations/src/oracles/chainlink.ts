
export type ChainlinkFeed = {
  chain: "base" | "ethereum";
  address: `0x${string}`;
  decimals: number;
};

export function normalizeChainlinkAnswer(answer: bigint, decimals: number) {
  return Number(answer) / 10 ** decimals;
}
