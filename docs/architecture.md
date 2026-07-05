# Architecture

Soroban Testbench is a mock-first Next.js Pages Router application. It separates UI, hooks, simulator logic, and typed domain contracts so future real adapters can be introduced without changing the core user workflow.

## Layers

- `src/pages` defines browser routes.
- `src/components` renders the landing page, testbench, scenario cards, result cards, and timelines.
- `src/hooks` owns React state for scenario execution and wallet/timeline helpers.
- `src/lib` contains deterministic simulators for RPC, wallet, transactions, and scenario orchestration.
- `src/utils/mockData.ts` stores reusable scenarios.

The current implementation never signs, submits, or fetches real network data.
