import { useState } from "react";
import type { WalletFailureMode } from "@/types/scenario";
import { simulateWalletFlow, type WalletSimulationResult } from "@/lib/walletSimulator";

export function useWalletFlow(defaultMode: WalletFailureMode = "none") {
  const [mode, setMode] = useState<WalletFailureMode>(defaultMode);
  const [result, setResult] = useState<WalletSimulationResult | null>(null);

  function runWalletFlow(nextMode = mode) {
    const walletResult = simulateWalletFlow(nextMode);
    setMode(nextMode);
    setResult(walletResult);
    return walletResult;
  }

  return { mode, setMode, result, runWalletFlow };
}
