import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useScenarioRunner } from "@/hooks/useScenarioRunner";


describe("useScenarioRunner", () => {
  it("selects and runs mock scenarios", () => {
    const { result } = renderHook(() => useScenarioRunner("rpc-timeout"));

    expect(result.current.scenario.id).toBe("rpc-timeout");

    act(() => {
      result.current.run();
    });

    expect(result.current.result?.ok).toBe(false);
    expect(result.current.result?.summary).toContain("timed out");
  });
});
