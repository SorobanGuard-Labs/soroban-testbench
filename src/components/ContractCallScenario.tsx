import type { ContractCallInput } from "@/types/scenario";
import { shortId } from "@/utils/formatting";

export function ContractCallScenario({ input }: { input: ContractCallInput }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold">Contract call scenario</h2>
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-slate-500">Contract ID</dt>
          <dd className="font-mono text-slate-950">{shortId(input.contractId)}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Network</dt>
          <dd className="font-medium">{input.network}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Method</dt>
          <dd className="font-mono">{input.method}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Args</dt>
          <dd className="font-mono">[{input.args.join(", ")}]</dd>
        </div>
      </dl>
    </section>
  );
}
