import type { RpcFailureMode } from "@/types/rpc";
import { sentenceCase } from "@/utils/formatting";

const modes: RpcFailureMode[] = ["none", "timeout", "rate_limit", "network_unavailable", "malformed_response"];

export function FailureModeSelector({ value }: { value: RpcFailureMode }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm" aria-labelledby="rpc-failure-heading">
      <h2 id="rpc-failure-heading" className="text-lg font-semibold">RPC failure mode</h2>
      <p className="mt-1 text-sm text-slate-600">Active mode for this scenario (read-only).</p>
      <div
        className="mt-4 grid gap-2 sm:grid-cols-2"
        role="listbox"
        aria-label="RPC failure modes"
        aria-activedescendant={`rpc-mode-${value}`}
      >
        {modes.map((mode) => {
          const selected = mode === value;
          return (
            <span
              key={mode}
              id={`rpc-mode-${mode}`}
              role="option"
              aria-selected={selected}
              className={`rounded-md border px-3 py-2 text-sm ${selected ? "border-cyan-600 bg-cyan-50 text-cyan-900" : "border-slate-200 bg-slate-50 text-slate-600"}`}
            >
              {sentenceCase(mode)}
              {selected ? <span className="sr-only"> (selected)</span> : null}
            </span>
          );
        })}
      </div>
    </section>
  );
}
