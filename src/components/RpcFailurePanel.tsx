import type { RpcFailureMode } from "@/types/rpc";
import { mockRpcRequest } from "@/lib/mockRpc";
import { sentenceCase } from "@/utils/formatting";

export function RpcFailurePanel({ mode }: { mode: RpcFailureMode }) {
  const response = mockRpcRequest({ kind: "getLatestLedger" }, mode);

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold">RPC simulator</h2>
      <div className="mt-4 rounded-md bg-slate-950 p-4 font-mono text-sm text-slate-100">
        <p>mode: {sentenceCase(mode)}</p>
        <p>status: {response.status}</p>
        <p>latency: {response.latencyMs}ms</p>
        <p>message: {response.message}</p>
      </div>
    </section>
  );
}
