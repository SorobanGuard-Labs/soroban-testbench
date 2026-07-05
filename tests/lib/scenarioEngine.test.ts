import { describe, expect, it } from "vitest";
import { runScenario } from "@/lib/scenarioEngine";
import { mockScenarios } from "@/utils/mockData";

function scenario(id: string) {
  const found = mockScenarios.find((item) => item.id === id);
  if (!found) throw new Error(`Missing scenario ${id}`);
  return found;
}

describe("runScenario", () => {
  it("runs a successful contract call", () => {
    const result = runScenario(scenario("successful-contract-call"));

    expect(result.ok).toBe(true);
    expect(result.transaction?.status).toBe("success");
    expect(result.timeline.at(-1)?.status).toBe("complete");
  });

  it("fails before RPC for invalid contract IDs", () => {
    const result = runScenario(scenario("contract-id-validation-failure"));

    expect(result.ok).toBe(false);
    expect(result.summary).toContain("Contract ID validation failed");
    expect(result.timeline[0].status).toBe("failed");
  });

  it("surfaces RPC timeout details", () => {
    const result = runScenario(scenario("rpc-timeout"));

    expect(result.ok).toBe(false);
    expect(result.summary).toContain("timed out");
    expect(result.details.some((detail) => detail.includes("HTTP 504"))).toBe(true);
  });

  it("keeps pending transactions as accepted but active", () => {
    const result = runScenario(scenario("pending-transaction"));

    expect(result.ok).toBe(true);
    expect(result.transaction?.status).toBe("pending");
    expect(result.timeline.at(-1)?.status).toBe("active");
  });

  it("connects the wallet but stops before submitting when the signature is rejected", () => {
    const result = runScenario(scenario("rejected-signature"));

    expect(result.ok).toBe(false);
    expect(result.summary).toContain("connected successfully");
    expect(result.summary).toContain("rejected the signature request");
    expect(result.details).toContain("Wallet connected: yes");
    expect(result.details).toContain("Signature: rejected");
    expect(result.details).toContain("No mock transaction was submitted.");
    expect(result.transaction).toBeUndefined();
    expect(result.timeline.find((step) => step.id === "signature")?.status).toBe("failed");
    expect(result.timeline.find((step) => step.id === "submit")?.status).toBe("pending");
  });

  it("never connects the wallet when the connection itself fails", () => {
    const result = runScenario(scenario("failed-wallet-connection"));

    expect(result.ok).toBe(false);
    expect(result.details).toContain("Wallet connected: no");
    expect(result.details).not.toContain("Signature: rejected");
    expect(result.transaction).toBeUndefined();
  });
});
