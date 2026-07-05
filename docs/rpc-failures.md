# RPC Failures

`mockRpcRequest` models Soroban RPC response shapes without making network calls.

Supported modes:

- `none`
- `timeout`
- `rate_limit`
- `network_unavailable`
- `malformed_response`

The simulator returns status codes, latency, request IDs, messages, and optional response data so frontend code can handle realistic states while staying offline.
