import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { APP_NAME, ORG_NAME } from "@/utils/constants";

export function Hero() {
  return (
    <section className="bg-[radial-gradient(circle_at_top_left,#e0f2fe,transparent_32rem),linear-gradient(135deg,#ffffff,#f8fafc)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-md border border-cyan-200 bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-800">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" /> {ORG_NAME}
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-normal text-slate-950 sm:text-5xl">
            {APP_NAME}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
            A mock-first testing playground for Soroban transaction workflows, contract calls, wallet flows, RPC behavior, and failure scenarios.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="inline-flex items-center gap-2 rounded-md bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800" href="/testbench">
              Open testbench <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link className="rounded-md border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100" href="/docs">
              Read docs
            </Link>
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-3 text-sm">
            {["Contract call builder", "Wallet rejection paths", "RPC timeout and malformed response modes", "Mock transaction timeline"].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-md bg-slate-50 px-4 py-3">
                <span>{item}</span>
                <span className="rounded bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-800">ready</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
