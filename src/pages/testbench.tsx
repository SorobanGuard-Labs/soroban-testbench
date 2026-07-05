import { Layout } from "@/components/Layout";
import { ScenarioRunner } from "@/components/ScenarioRunner";

export default function TestbenchPage() {
  return (
    <Layout>
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScenarioRunner />
        </div>
      </section>
    </Layout>
  );
}
