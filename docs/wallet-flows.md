# Wallet Flows

`simulateWalletFlow` models three wallet states:

- Connected and signed
- Connection failed
- Signature rejected

No real private keys, wallet extensions, or transaction envelopes are used. The mock public key is intentionally fake and only exists to shape UI state.

## Rejected signature path

The `rejected-signature` scenario (`src/utils/mockData.ts`) models a common cancellation flow: the mock wallet connects successfully, then the user declines the signature prompt. `runScenario` (`src/lib/scenarioEngine.ts`) returns before calling `simulateTransaction`, so:

- `result.transaction` is `undefined` — no mock transaction is ever built or submitted.
- The "Wallet signature" timeline step is `failed`, and every step after it (`submit`, `confirm`) stays `pending`.
- `result.details` includes explicit, assertable lines: `"Wallet connected: yes"`, `"Signature: rejected"`, and `"No mock transaction was submitted."`.

`describeWalletOutcome` in `src/lib/walletSimulator.ts` is the single source of truth for that detail wording, shared by both the standalone `WalletFlowSimulator` panel and `runScenario`, so the UI and tests stay in sync. See `tests/lib/scenarioEngine.test.ts` for the assertions against this scenario.
