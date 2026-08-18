import { WalletCards } from "lucide-react";
import type { WalletFailureMode } from "@/types/scenario";
import { simulateWalletFlow } from "@/lib/walletSimulator";
import { sentenceCase, shortId } from "@/utils/formatting";

function signatureLabel(connected: boolean, signed: boolean): string {
  if (!connected) return "n/a";
  return signed ? "granted" : "rejected";
}

export function WalletFlowSimulator({ mode }: { mode: WalletFailureMode }) {
  const result = simulateWalletFlow(mode);

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <WalletCards className="h-5 w-5 text-cyan-700" aria-hidden="true" /> Wallet flow
      </h2>
      <dl className="mt-4 grid gap-3 text-sm">
        <div className="flex justify-between gap-4"><dt className="text-slate-500">Mode</dt><dd>{sentenceCase(mode)}</dd></div>
        <div className="flex justify-between gap-4"><dt className="text-slate-500">Connected</dt><dd>{result.connected ? "yes" : "no"}</dd></div>
        <div className="flex justify-between gap-4"><dt className="text-slate-500">Signature</dt><dd>{signatureLabel(result.connected, result.signed)}</dd></div>
        {result.publicKey ? <div className="flex justify-between gap-4"><dt className="text-slate-500">Public key</dt><dd className="font-mono">{shortId(result.publicKey)}</dd></div> : null}
        <div className="flex justify-between gap-4"><dt className="text-slate-500">Transaction submitted</dt><dd>{result.signed ? "yes" : "no"}</dd></div>
      </dl>
      <p className="mt-4 rounded-md bg-slate-50 p-3 text-sm text-slate-700">{result.message}</p>
    </section>
  );
}
