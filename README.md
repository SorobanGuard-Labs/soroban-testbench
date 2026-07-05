# Soroban Testbench

Soroban Testbench is a mock-first testing playground for Soroban transaction workflows, contract calls, wallet flows, RPC behavior, and failure scenarios. It helps developers test and understand Soroban frontend workflows without requiring real contracts, private keys, or mainnet transactions.

Built by SorobanGuard Labs. This project has no official affiliation with Stellar or Soroban.

## Features

- Landing page and interactive testbench page built with Next.js Pages Router.
- Contract call scenario builder with reusable mock inputs.
- Wallet flow simulator for connection failures and rejected signatures.
- RPC failure simulator for timeouts, rate limits, network outages, and malformed responses.
- Transaction timeline for build, simulate, sign, submit, and confirm steps.
- Scenario runner with deterministic mock results and test result cards.
- TypeScript domain model for scenarios, RPC responses, and transactions.
- Vitest and React Testing Library coverage for logic, hooks, and components.
- GitHub Actions CI for linting, typechecking, tests, and production builds.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000 and visit `/testbench` to run mock scenarios.

## Environment

Copy `.env.example` when you want explicit local defaults:

```bash
NEXT_PUBLIC_SOROBAN_TESTBENCH_DEMO_MODE=true
NEXT_PUBLIC_DEFAULT_NETWORK=testnet
```

## Commands

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run test
npm run test:watch
```

## Usage

1. Choose a scenario from the testbench sidebar.
2. Review the contract call, wallet mode, and RPC failure mode.
3. Run the scenario.
4. Inspect the result card and transaction timeline.

Included scenarios cover successful contract calls, failed wallet connection, rejected signature, RPC timeout, contract ID validation failure, pending transaction, failed transaction, and successful simulated transaction.

## Mock Mode

Soroban Testbench is intentionally mock-first. It does not submit transactions, sign real payloads, store private keys, or connect to mainnet. Mock mode lets frontend teams rehearse UX states before wiring real adapters.

Future adapter TODOs are kept in code for real RPC, real wallet, saved scenarios, scenario import/export, Soroban Guard Kit integration, and Soroban Risk Indexer integration.

## Project Structure

```text
src/components   UI panels and page composition
src/hooks        React hooks for scenario, wallet, and timeline state
src/lib          Deterministic mock simulators and scenario engine
src/pages        Next.js Pages Router routes
src/types        Shared TypeScript contracts
src/utils        Constants, formatting helpers, and mock data
tests            Vitest unit and component tests
docs             Maintainer and user documentation
```

## Roadmap

- Real RPC adapter behind an explicit non-demo flag.
- Real wallet adapter for selected test wallets.
- Saved local scenarios.
- Scenario import and export.
- Integration with Soroban Guard Kit.
- Integration with Soroban Risk Indexer.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). Please keep new features mock-safe by default and include tests for simulator behavior or user-facing workflow changes.
