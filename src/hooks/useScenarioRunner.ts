import { useMemo, useState } from "react";
import type { ScenarioResult, TestScenario } from "@/types/scenario";
import { runScenario } from "@/lib/scenarioEngine";
import { mockScenarios } from "@/utils/mockData";

export function useScenarioRunner(initialScenarioId = mockScenarios[0]?.id) {
  const [selectedScenarioId, setSelectedScenarioId] = useState(initialScenarioId);
  const [result, setResult] = useState<ScenarioResult | null>(null);

  const scenario = useMemo(
    () => mockScenarios.find((item) => item.id === selectedScenarioId) ?? mockScenarios[0],
    [selectedScenarioId],
  );

  function run(selected: TestScenario = scenario) {
    const nextResult = runScenario(selected);
    setResult(nextResult);
    return nextResult;
  }

  return {
    scenarios: mockScenarios,
    scenario,
    selectedScenarioId,
    setSelectedScenarioId,
    result,
    run,
  };
}
