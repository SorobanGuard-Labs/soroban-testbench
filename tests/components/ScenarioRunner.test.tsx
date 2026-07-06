import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ScenarioRunner } from "@/components/ScenarioRunner";

describe("ScenarioRunner", () => {
  it("runs the selected scenario and renders a result", () => {
    render(<ScenarioRunner />);

    fireEvent.click(screen.getByRole("button", { name: /run successful contract call scenario/i }));

    expect(screen.getByRole("heading", { name: "Successful contract call" })).toBeInTheDocument();
    expect(screen.getByRole("status", { name: /successful contract call/i })).toBeInTheDocument();
    expect(screen.getByRole("list", { name: /transaction progress steps/i })).toBeInTheDocument();
    expect(screen.getByText(/Scenario completed successfully/)).toBeInTheDocument();
    expect(screen.getByText(/Transaction timeline/)).toBeInTheDocument();
  });
});
