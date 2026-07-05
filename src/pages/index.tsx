import { Hero } from "@/components/Hero";
import { Layout } from "@/components/Layout";
import { mockScenarios } from "@/utils/mockData";

export default function HomePage() {
  return (
    <Layout>
      <Hero />
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-semibold">Approval-ready mock coverage</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {mockScenarios.slice(0, 4).map((scenario) => (
              <article key={scenario.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-cyan-800">{scenario.category}</p>
                <h3 className="mt-2 font-semibold">{scenario.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{scenario.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
