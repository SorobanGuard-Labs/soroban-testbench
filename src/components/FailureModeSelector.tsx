import type { RpcFailureMode } from "@/types/rpc";
import { sentenceCase } from "@/utils/formatting";

const modes: RpcFailureMode[] = ["none", "timeout", "rate_limit", "network_unavailable", "malformed_response"];

export function FailureModeSelector({ value }: { value: RpcFailureMode }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold">RPC failure mode</h2>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {modes.map((mode) => (
          <span key={mode} className={`rounded-md border px-3 py-2 text-sm ${mode === value ? "border-cyan-600 bg-cyan-50 text-cyan-900" : "border-slate-200 bg-slate-50 text-slate-600"}`}>
            {sentenceCase(mode)}
          </span>
        ))}
      </div>
    </section>
  );
}
