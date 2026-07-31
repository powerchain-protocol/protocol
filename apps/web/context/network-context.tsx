"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import { NETWORK_OPTIONS } from "@/config/networks";
import type { ChainId, NetworkProviderId } from "@/types/network";

export interface NetworkContextValue {
  chain: ChainId;
  provider: NetworkProviderId;
  rpcUrl: string;
  customRpcUrl: string;

  selectChain: (chain: ChainId) => void;
  setCustomRpcUrl: Dispatch<SetStateAction<string>>;
  applyCustomRpc: () => void;
}

const STORAGE_KEY = "powerchain_network";

const DEFAULT_NETWORK = NETWORK_OPTIONS[0];

if (!DEFAULT_NETWORK) {
  throw new Error(
    "NETWORK_OPTIONS must contain at least one configured network."
  );
}

const NetworkContext = createContext<NetworkContextValue | null>(null);

interface PersistedNetwork {
  chain?: ChainId;
  provider?: NetworkProviderId;
  rpcUrl?: string;
  customRpcUrl?: string;
}

export function NetworkProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [chain, setChain] = useState<ChainId>(
    DEFAULT_NETWORK.id as ChainId
  );

  const [provider, setProvider] = useState<NetworkProviderId>(
    DEFAULT_NETWORK.provider as NetworkProviderId
  );

  // Explicit string prevents literal type inference
  const [rpcUrl, setRpcUrl] = useState<string>(
    DEFAULT_NETWORK.rpcUrl
  );

  const [customRpcUrl, setCustomRpcUrl] =
    useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);

      if (!raw) return;

      const saved: PersistedNetwork = JSON.parse(raw);

      if (saved.chain) {
        setChain(saved.chain);
      }

      if (saved.provider) {
        setProvider(saved.provider);
      }

      if (typeof saved.rpcUrl === "string") {
        setRpcUrl(saved.rpcUrl);
      }

      if (typeof saved.customRpcUrl === "string") {
        setCustomRpcUrl(saved.customRpcUrl);
      }
    } catch (error) {
      console.warn(
        "Failed to restore network settings.",
        error
      );
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const state: PersistedNetwork = {
      chain,
      provider,
      rpcUrl,
      customRpcUrl,
    };

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(state)
    );
  }, [chain, provider, rpcUrl, customRpcUrl]);

  const selectChain = useCallback(
    (id: ChainId) => {
      const network = NETWORK_OPTIONS.find(
        (network) => network.id === id
      );

      if (!network) {
        console.warn(`Unknown network: ${id}`);
        return;
      }

      setChain(id);
      setProvider(
        network.provider as NetworkProviderId
      );
      setRpcUrl(network.rpcUrl);
    },
    []
  );

  const applyCustomRpc = useCallback(() => {
    const value = customRpcUrl.trim();

    if (!value) {
      throw new Error("RPC URL is required.");
    }

    let parsed: URL;

    try {
      parsed = new URL(value);
    } catch {
      throw new Error("Invalid RPC URL.");
    }

    if (
      parsed.protocol !== "http:" &&
      parsed.protocol !== "https:"
    ) {
      throw new Error(
        "RPC URL must use HTTP or HTTPS."
      );
    }

    setProvider("custom" as NetworkProviderId);
    setRpcUrl(parsed.toString());
  }, [customRpcUrl]);

  const value = useMemo<NetworkContextValue>(
    () => ({
      chain,
      provider,
      rpcUrl,
      customRpcUrl,
      selectChain,
      setCustomRpcUrl,
      applyCustomRpc,
    }),
    [
      chain,
      provider,
      rpcUrl,
      customRpcUrl,
      selectChain,
      applyCustomRpc,
    ]
  );

  return (
    <NetworkContext.Provider value={value}>
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetwork(): NetworkContextValue {
  const context = useContext(NetworkContext);

  if (context === null) {
    throw new Error(
      "useNetwork() must be used inside <NetworkProvider>."
    );
  }

  return context;
}