import type { RpcFailureMode } from "./rpc";
import type { SimulatedTransaction, TransactionStep } from "./transaction";

export type WalletFailureMode = "none" | "connection_failed" | "signature_rejected";
export type ScenarioCategory = "contract" | "wallet" | "rpc" | "transaction";

export interface ContractCallInput {
  contractId: string;
  method: string;
  args: string[];
  network: string;
}

export interface TestScenario {
  id: string;
  title: string;
  category: ScenarioCategory;
  description: string;
  input: ContractCallInput;
  rpcFailure: RpcFailureMode;
  walletFailure: WalletFailureMode;
  expectedOutcome: "success" | "failure" | "pending";
}

export interface ScenarioResult {
  scenarioId: string;
  ok: boolean;
  title: string;
  summary: string;
  details: string[];
  transaction?: SimulatedTransaction;
  timeline: TransactionStep[];
}

export type ExportFormat = "json" | "csv";

export interface ExportedScenarioPayload {
  exportedAt: string;
  scenarioId: string;
  outcome: "success" | "failure";
  title: string;
  summary: string;
  details: string[];
  transaction: SimulatedTransaction | null;
  timeline: TransactionStep[];
}
