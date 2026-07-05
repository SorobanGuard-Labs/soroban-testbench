import type { WalletFailureMode } from "@/types/scenario";

export interface WalletSimulationResult {
  connected: boolean;
  signed: boolean;
  publicKey?: string;
  message: string;
}

export function simulateWalletFlow(mode: WalletFailureMode): WalletSimulationResult {
  // TODO: real wallet adapter.
  if (mode === "connection_failed") {
    return {
      connected: false,
      signed: false,
      message: "Wallet connection failed in the mock provider.",
    };
  }

  if (mode === "signature_rejected") {
    return {
      connected: true,
      signed: false,
      publicKey: "GMOCKWALLETTESTBENCHUSERPUBLICKEY00000000000000000000000",
      message: "The mock user rejected the signature request.",
    };
  }

  return {
    connected: true,
    signed: true,
    publicKey: "GMOCKWALLETTESTBENCHUSERPUBLICKEY00000000000000000000000",
    message: "Wallet connected and signed with a mock key.",
  };
}
