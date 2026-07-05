export type TransactionStatus =
  | "draft"
  | "simulating"
  | "awaiting_signature"
  | "submitting"
  | "pending"
  | "success"
  | "failed";

export interface TransactionStep {
  id: string;
  label: string;
  description: string;
  status: "pending" | "active" | "complete" | "failed";
}

export interface SimulatedTransaction {
  id: string;
  contractId: string;
  method: string;
  network: string;
  status: TransactionStatus;
  feeStroops: number;
  ledger: number;
  envelopeXdr: string;
  resultXdr?: string;
  error?: string;
}
