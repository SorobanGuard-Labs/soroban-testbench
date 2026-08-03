import { CheckCircle2, Clock3, XCircle } from "lucide-react";
import type { ScenarioResult } from "@/types/scenario";
import { formatStroops } from "@/utils/formatting";

export function TestResultCard({ result }: { result: ScenarioResult | null }) {
  if (!result) {
    return (
      <section
        className="rounded-lg border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-600"
        aria-live="polite"
        aria-label="Scenario result"
      >
        Run a scenario to see the mock result payload, transaction metadata, and assertions.
      </section>
    );
  }

  const pending = result.transaction?.status === "pending";
  const Icon = result.ok ? (pending ? Clock3 : CheckCircle2) : XCircle;
  const statusLabel = result.ok ? (pending ? "Pending" : "Passed") : "Failed";

  return (
    <section
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
      aria-live="polite"
      aria-label={`Scenario result: ${statusLabel}`}
    >
      <div className="flex items-start gap-3">
        <Icon className={`mt-1 h-5 w-5 ${result.ok ? "text-emerald-700" : "text-rose-700"}`} aria-hidden="true" />
        <div>
          <h2 className="text-lg font-semibold">{result.title}</h2>
          <p className="mt-1 text-sm text-slate-700">{result.summary}</p>
          <p className="sr-only">Status: {statusLabel}</p>
        </div>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {result.details.map((detail) => <li key={detail}>{detail}</li>)}
      </ul>
      {result.transaction ? (
        <dl className="mt-4 grid gap-2 rounded-md bg-slate-50 p-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-slate-500">Fee</dt>
            <dd>{formatStroops(result.transaction.feeStroops)}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Ledger</dt>
            <dd>{result.transaction.ledger}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Status</dt>
            <dd>{result.transaction.status}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Method</dt>
            <dd>{result.transaction.method}</dd>
          </div>
        </dl>
      ) : null}
    </section>
  );
}
