import { describe, expect, it } from "vitest";
import { exportScenarioResultAsCsv, exportScenarioResultAsJson, runScenario } from "@/lib/scenarioEngine";
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

  it("exports scenario result as valid JSON with all required fields", () => {
    const result = runScenario(scenario("successful-contract-call"));
    const jsonStr = exportScenarioResultAsJson(result);
    const parsed = JSON.parse(jsonStr);

    expect(parsed.scenarioId).toBe(result.scenarioId);
    expect(parsed.outcome).toBe("success");
    expect(parsed.title).toBe(result.title);
    expect(parsed.summary).toBe(result.summary);
    expect(parsed.details).toEqual(result.details);
    expect(parsed.transaction?.status).toBe("success");
    expect(parsed.timeline.length).toBeGreaterThan(0);
    expect(parsed.exportedAt).toBeDefined();
  });

  it("exports scenario result as structured CSV with escaped fields", () => {
    const result = runScenario(scenario("successful-contract-call"));
    const csvStr = exportScenarioResultAsCsv(result);

    expect(csvStr).toContain("scenario_id,outcome,title,summary,details,tx_id,tx_status,ledger,method,fee_stroops,timeline_steps");
    expect(csvStr).toContain(`"${result.scenarioId}"`);
    expect(csvStr).toContain('"success"');
    expect(csvStr).toContain(`"${result.title}"`);
  });
});
