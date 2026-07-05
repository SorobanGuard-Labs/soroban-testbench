import type { ContractCallInput } from "@/types/scenario";
import type { SimulatedTransaction, TransactionStep, TransactionStatus } from "@/types/transaction";

export function isValidContractId(contractId: string): boolean {
  return /^C[A-Z0-9]{20,}$/.test(contractId);
}

export function inferTransactionStatus(method: string): TransactionStatus {
  if (method.includes("pending")) return "pending";
  if (method.includes("fail")) return "failed";
  return "success";
}

export function simulateTransaction(input: ContractCallInput): SimulatedTransaction {
  const status = inferTransactionStatus(input.method);

  return {
    id: `tx-${input.method}-${input.contractId.slice(0, 8)}`,
    contractId: input.contractId,
    method: input.method,
    network: input.network,
    status,
    feeStroops: status === "failed" ? 280_000 : 120_000,
    ledger: 184926,
    envelopeXdr: `AAAA-mock-envelope-${input.method}`,
    resultXdr: status === "success" ? `AAAA-mock-result-${input.method}` : undefined,
    error: status === "failed" ? "Mock host function returned an application error." : undefined,
  };
}

export function buildTimeline(status: TransactionStatus): TransactionStep[] {
  const failed = status === "failed";
  const pending = status === "pending";

  return [
    {
      id: "build",
      label: "Build call",
      description: "Create a Soroban contract invocation envelope in memory.",
      status: "complete",
    },
    {
      id: "simulate",
      label: "Simulate",
      description: "Run preflight against the mock RPC layer.",
      status: "complete",
    },
    {
      id: "signature",
      label: "Wallet signature",
      description: "Collect authorization from a mock wallet provider.",
      status: "complete",
    },
    {
      id: "submit",
      label: "Submit",
      description: "Submit a fake transaction and observe the response shape.",
      status: failed ? "failed" : "complete",
    },
    {
      id: "confirm",
      label: "Confirm",
      description: "Poll mock ledger state for finality.",
      status: failed ? "pending" : pending ? "active" : "complete",
    },
  ];
}
