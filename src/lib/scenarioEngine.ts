import type { ExportFormat, ExportedScenarioPayload, ScenarioResult, TestScenario } from "@/types/scenario";
import type { TransactionStep } from "@/types/transaction";
import { escapeCsvField } from "@/utils/formatting";
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

export function exportScenarioResultAsJson(result: ScenarioResult): string {
  const payload: ExportedScenarioPayload = {
    exportedAt: new Date().toISOString(),
    scenarioId: result.scenarioId,
    outcome: result.ok ? "success" : "failure",
    title: result.title,
    summary: result.summary,
    details: result.details,
    transaction: result.transaction ?? null,
    timeline: result.timeline,
  };

  return JSON.stringify(payload, null, 2);
}

export function exportScenarioResultAsCsv(result: ScenarioResult): string {
  const headers = [
    "scenario_id",
    "outcome",
    "title",
    "summary",
    "details",
    "tx_id",
    "tx_status",
    "ledger",
    "method",
    "fee_stroops",
    "timeline_steps",
  ];

  const detailsFormatted = result.details.join("; ");
  const timelineFormatted = result.timeline
    .map((step) => `${step.id}:${step.status}`)
    .join("; ");

  const row = [
    escapeCsvField(result.scenarioId),
    escapeCsvField(result.ok ? "success" : "failure"),
    escapeCsvField(result.title),
    escapeCsvField(result.summary),
    escapeCsvField(detailsFormatted),
    escapeCsvField(result.transaction?.id ?? ""),
    escapeCsvField(result.transaction?.status ?? ""),
    escapeCsvField(result.transaction?.ledger ?? ""),
    escapeCsvField(result.transaction?.method ?? ""),
    escapeCsvField(result.transaction?.feeStroops ?? ""),
    escapeCsvField(timelineFormatted),
  ];

  return `${headers.join(",")}\n${row.join(",")}\n`;
}

export function downloadScenarioResult(result: ScenarioResult, format: ExportFormat): void {
  if (typeof window === "undefined") return;

  const isJson = format === "json";
  const content = isJson ? exportScenarioResultAsJson(result) : exportScenarioResultAsCsv(result);
  const mimeType = isJson ? "application/json" : "text/csv";
  const filename = `${result.scenarioId}-result.${format}`;

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

