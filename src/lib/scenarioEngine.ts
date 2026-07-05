import type { ScenarioResult, TestScenario } from "@/types/scenario";
import type { TransactionStep } from "@/types/transaction";
import { mockRpcRequest } from "./mockRpc";
import { buildTimeline, isValidContractId, simulateTransaction } from "./transactionSimulator";
import { simulateWalletFlow } from "./walletSimulator";

const timelineOrder = ["build", "simulate", "signature", "submit", "confirm"] as const;
const timelineLabels: Record<(typeof timelineOrder)[number], string> = {
  build: "Build call",
  simulate: "Simulate",
  signature: "Wallet signature",
  submit: "Submit",
  confirm: "Confirm",
};

const failedTimeline = (failedStep: (typeof timelineOrder)[number]): TransactionStep[] => {
  const failedIndex = timelineOrder.indexOf(failedStep);

  return timelineOrder.map((id, index) => ({
    id,
    label: timelineLabels[id],
    description: `Mock ${id} step`,
    status: index < failedIndex ? "complete" : index === failedIndex ? "failed" : "pending",
  }));
};

export function runScenario(scenario: TestScenario): ScenarioResult {
  // TODO: saved scenarios.
  // TODO: scenario import/export.
  // TODO: integration with Soroban Guard Kit.
  // TODO: integration with Soroban Risk Indexer.
  if (!isValidContractId(scenario.input.contractId)) {
    return {
      scenarioId: scenario.id,
      ok: false,
      title: scenario.title,
      summary: "Contract ID validation failed before RPC simulation.",
      details: ["Contract IDs should start with C and contain an uppercase mock payload."],
      timeline: failedTimeline("build"),
    };
  }

  const rpc = mockRpcRequest(
    {
      kind: "simulateTransaction",
      contractId: scenario.input.contractId,
      payload: { ...scenario.input },
    },
    scenario.rpcFailure,
  );

  if (!rpc.ok) {
    return {
      scenarioId: scenario.id,
      ok: false,
      title: scenario.title,
      summary: rpc.message,
      details: [`HTTP ${rpc.status}`, `Latency ${rpc.latencyMs}ms`, `Request ${rpc.requestId}`],
      timeline: failedTimeline("simulate"),
    };
  }

  const wallet = simulateWalletFlow(scenario.walletFailure);

  if (!wallet.connected || !wallet.signed) {
    return {
      scenarioId: scenario.id,
      ok: false,
      title: scenario.title,
      summary: wallet.message,
      details: [wallet.publicKey ? `Wallet ${wallet.publicKey}` : "No wallet public key available"],
      timeline: failedTimeline(wallet.connected ? "signature" : "build"),
    };
  }

  const transaction = simulateTransaction(scenario.input);
  const ok = transaction.status === "success";
  const pending = transaction.status === "pending";

  return {
    scenarioId: scenario.id,
    ok: ok || pending,
    title: scenario.title,
    summary: pending
      ? "Transaction accepted and still pending mock confirmation."
      : ok
        ? "Scenario completed successfully in mock mode."
        : transaction.error ?? "Transaction failed in mock mode.",
    details: [
      wallet.message,
      rpc.message,
      `Ledger ${transaction.ledger}`,
      `Status ${transaction.status}`,
    ],
    transaction,
    timeline: buildTimeline(transaction.status),
  };
}

