import { Play } from "lucide-react";
import { ContractCallScenario } from "./ContractCallScenario";
import { FailureModeSelector } from "./FailureModeSelector";
import { RpcFailurePanel } from "./RpcFailurePanel";
import { TestResultCard } from "./TestResultCard";
import { TransactionTimeline } from "./TransactionTimeline";
import { WalletFlowSimulator } from "./WalletFlowSimulator";
import { useScenarioRunner } from "@/hooks/useScenarioRunner";
import { useTransactionTimeline } from "@/hooks/useTransactionTimeline";

export function ScenarioRunner() {
  const { scenarios, scenario, selectedScenarioId, setSelectedScenarioId, result, run } = useScenarioRunner();
  const previewTimeline = useTransactionTimeline("success");
  const timeline = result?.timeline ?? previewTimeline;

  return (
    <div className="grid gap-6 lg:grid-cols-[22rem_1fr]">
      <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-xl font-semibold">Scenario runner</h1>
        <p className="mt-2 text-sm text-slate-600">Choose a reusable mock scenario and run the full frontend workflow without contracts, private keys, or mainnet transactions.</p>
        <label className="mt-5 block text-sm font-medium text-slate-700" htmlFor="scenario-select">Scenario</label>
        <select
          id="scenario-select"
          className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
          value={selectedScenarioId}
          onChange={(event) => setSelectedScenarioId(event.target.value)}
        >
          {scenarios.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
        </select>
        <p className="mt-4 text-sm text-slate-700">{scenario.description}</p>
        <button
          aria-label={`Run ${scenario.title} scenario`}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-cyan-700 px-4 py-3 text-sm font-semibold text-white hover:bg-cyan-800"
          type="button"
          onClick={() => run()}
        >
          <Play className="h-4 w-4" aria-hidden="true" /> Run scenario
        </button>
      </aside>
      <div className="grid gap-6">
        <div className="grid gap-6 xl:grid-cols-2">
          <ContractCallScenario input={scenario.input} />
          <FailureModeSelector value={scenario.rpcFailure} />
          <WalletFlowSimulator mode={scenario.walletFailure} />
          <RpcFailurePanel mode={scenario.rpcFailure} />
        </div>
        <TestResultCard result={result} />
        <TransactionTimeline steps={timeline} />
      </div>
    </div>
  );
}
