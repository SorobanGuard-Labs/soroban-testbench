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
      message: "Mock wallet connected successfully, but the user rejected the signature request.",
    };
  }

  return {
    connected: true,
    signed: true,
    publicKey: "GMOCKWALLETTESTBENCHUSERPUBLICKEY00000000000000000000000",
    message: "Wallet connected and signed with a mock key.",
  };
}

// Shared by the wallet-only UI panel and the scenario engine so both surfaces (and tests) agree on wording.
export function describeWalletOutcome(result: WalletSimulationResult): string[] {
  const details = [result.connected ? "Wallet connected: yes" : "Wallet connected: no"];

  if (result.connected) {
    details.push(result.signed ? "Signature: granted" : "Signature: rejected");
  }

  details.push(result.publicKey ? `Wallet ${result.publicKey}` : "No wallet public key available");

  if (!result.signed) {
    details.push("No mock transaction was submitted.");
  }

  return details;
}
