# Test Scenarios

Reusable scenarios live in `src/utils/mockData.ts` and are executed by `src/lib/scenarioEngine.ts`.

Included examples:

- Successful contract call
- Failed wallet connection
- Rejected signature
- RPC timeout
- Contract ID validation failure
- Pending transaction
- Failed transaction
- Successful simulated transaction

Each scenario declares a contract call input, RPC failure mode, wallet failure mode, category, and expected outcome.
