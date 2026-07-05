import type { MockRpcRequest, MockRpcResponse, RpcFailureMode } from "@/types/rpc";

const failureMessages: Record<Exclude<RpcFailureMode, "none">, string> = {
  timeout: "RPC request timed out before a ledger response was received.",
  rate_limit: "RPC endpoint returned a rate limit response.",
  network_unavailable: "RPC endpoint is unavailable for the selected network.",
  malformed_response: "RPC endpoint returned malformed transaction data.",
};

export function createRequestId(kind: string): string {
  return `mock-${kind}-${Math.random().toString(16).slice(2, 10)}`;
}

export function mockRpcRequest(
  request: MockRpcRequest,
  failureMode: RpcFailureMode = "none",
): MockRpcResponse {
  // TODO: real RPC adapter.
  if (failureMode !== "none") {
    return {
      ok: false,
      status: failureMode === "timeout" ? 504 : 503,
      latencyMs: failureMode === "timeout" ? 10_000 : 420,
      requestId: createRequestId(request.kind),
      message: failureMessages[failureMode],
    };
  }

  return {
    ok: true,
    status: 200,
    latencyMs: 180,
    requestId: createRequestId(request.kind),
    message: `${request.kind} completed in mock mode.`,
    data: {
      ledger: 184926,
      network: request.payload?.network ?? "testnet",
      contractId: request.contractId,
      mode: "mock",
    },
  };
}
