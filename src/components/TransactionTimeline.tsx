import type { TransactionStep } from "@/types/transaction";

const statusClass = {
  pending: "border-slate-300 bg-slate-50 text-slate-500",
  active: "border-amber-300 bg-amber-50 text-amber-800",
  complete: "border-emerald-300 bg-emerald-50 text-emerald-800",
  failed: "border-rose-300 bg-rose-50 text-rose-800",
};

export function TransactionTimeline({ steps }: { steps: TransactionStep[] }) {
  return (
    <section aria-labelledby="transaction-timeline-heading" className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold" id="transaction-timeline-heading">Transaction timeline</h2>
      <ol aria-label="Transaction progress steps" className="mt-4 space-y-3">
        {steps.map((step) => (
          <li key={step.id} className={`rounded-md border px-4 py-3 ${statusClass[step.status]}`}>
            <div className="flex items-center justify-between gap-4">
              <span className="font-semibold">{step.label}</span>
              <span aria-label={`${step.label} status: ${step.status}`} className="text-xs uppercase tracking-normal">{step.status}</span>
            </div>
            <p className="mt-1 text-sm">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
