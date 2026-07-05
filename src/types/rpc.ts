export type RpcFailureMode =
  | "none"
  | "timeout"
  | "rate_limit"
  | "network_unavailable"
  | "malformed_response";

export type RpcRequestKind =
  | "getLatestLedger"
  | "simulateTransaction"
  | "sendTransaction"
  | "getTransaction";

export interface MockRpcRequest {
  kind: RpcRequestKind;
  contractId?: string;
  payload?: Record<string, unknown>;
}

export interface MockRpcResponse {
  ok: boolean;
  status: number;
  latencyMs: number;
  requestId: string;
  message: string;
  data?: Record<string, unknown>;
}
