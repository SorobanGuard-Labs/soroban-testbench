export const APP_NAME = "Soroban Testbench";
export const ORG_NAME = "SorobanGuard Labs";
export const DEFAULT_NETWORK = process.env.NEXT_PUBLIC_DEFAULT_NETWORK ?? "testnet";
export const DEMO_MODE = process.env.NEXT_PUBLIC_SOROBAN_TESTBENCH_DEMO_MODE !== "false";

export const MOCK_CONTRACT_ID =
  "CBQPFJX4X4AXKQJ3J7W4QZ5W7X7X4C5D7JQK4V2KX7J5H3M9N8P2Q1R0";

export const TODO_INTEGRATIONS = [
  "real RPC adapter",
  "real wallet adapter",
  "saved scenarios",
  "scenario import/export",
  "integration with Soroban Guard Kit",
  "integration with Soroban Risk Indexer",
] as const;
