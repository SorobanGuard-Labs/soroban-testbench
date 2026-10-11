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

## Result Export (JSON & CSV)

Scenario run outputs can be exported directly from the testbench UI:
- **JSON**: Full structured result including scenario ID, execution outcome, title, summary, diagnostic details array, simulated transaction metadata, and timeline states.
- **CSV**: Spreadsheet-compatible row with standardized headers (`scenario_id`, `outcome`, `title`, `summary`, `details`, `tx_hash`, `tx_status`, `ledger`, `method`, `fee_stroops`, `timeline_steps`) and proper escaping for sharing and comparing regression runs.
