import Link from "next/link";
import { Layout } from "@/components/Layout";

const docs = [
  ["Architecture", "/docs/architecture.md"],
  ["Getting started", "/docs/getting-started.md"],
  ["Test scenarios", "/docs/test-scenarios.md"],
  ["RPC failures", "/docs/rpc-failures.md"],
  ["Wallet flows", "/docs/wallet-flows.md"],
  ["Roadmap", "/docs/roadmap.md"],
];

export default function DocsPage() {
  return (
    <Layout>
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold">Documentation</h1>
          <p className="mt-3 text-slate-700">Repository docs cover architecture, setup, reusable scenarios, mock RPC failures, wallet flows, and roadmap items.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {docs.map(([title, href]) => (
              <Link key={href} className="rounded-lg border border-slate-200 bg-white p-5 font-semibold shadow-sm hover:border-cyan-400" href={href}>
                {title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
