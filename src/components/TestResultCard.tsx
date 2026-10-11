import { CheckCircle2, Clock3, Download, XCircle } from "lucide-react";
import type { ScenarioResult } from "@/types/scenario";
import { formatStroops } from "@/utils/formatting";
import { downloadScenarioResult } from "@/lib/scenarioEngine";

export function TestResultCard({ result }: { result: ScenarioResult | null }) {
  if (!result) {
    return (
      <section className="rounded-lg border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-600">
        Run a scenario to see the mock result payload, transaction metadata, and assertions.
      </section>
    );
  }

  const pending = result.transaction?.status === "pending";
  const Icon = result.ok ? (pending ? Clock3 : CheckCircle2) : XCircle;

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <Icon className={`mt-1 h-5 w-5 ${result.ok ? "text-emerald-700" : "text-rose-700"}`} aria-hidden="true" />
          <div>
            <h2 className="text-lg font-semibold">{result.title}</h2>
            <p className="mt-1 text-sm text-slate-700">{result.summary}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-600"
            onClick={() => downloadScenarioResult(result, "json")}
            aria-label="Export JSON"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            Export JSON
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-600"
            onClick={() => downloadScenarioResult(result, "csv")}
            aria-label="Export CSV"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            Export CSV
          </button>
        </div>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {result.details.map((detail) => <li key={detail}>- {detail}</li>)}
      </ul>
      {result.transaction ? (
        <div className="mt-4 grid gap-2 rounded-md bg-slate-50 p-3 text-sm sm:grid-cols-2">
          <span>Fee: {formatStroops(result.transaction.feeStroops)}</span>
          <span>Ledger: {result.transaction.ledger}</span>
          <span>Status: {result.transaction.status}</span>
          <span>Method: {result.transaction.method}</span>
        </div>
      ) : null}
    </section>
  );
}
