import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ScenarioRunner } from "@/components/ScenarioRunner";

describe("ScenarioRunner", () => {
  it("runs the selected scenario and renders a result with export actions", () => {
    render(<ScenarioRunner />);

    fireEvent.click(screen.getByRole("button", { name: /run scenario/i }));

    expect(screen.getByRole("heading", { name: "Successful contract call" })).toBeInTheDocument();
    expect(screen.getByText(/Scenario completed successfully/)).toBeInTheDocument();
    expect(screen.getByText(/Transaction timeline/)).toBeInTheDocument();

    const jsonBtn = screen.getByRole("button", { name: /export json/i });
    const csvBtn = screen.getByRole("button", { name: /export csv/i });
    expect(jsonBtn).toBeInTheDocument();
    expect(csvBtn).toBeInTheDocument();

    const createObjectURLMock = vi.fn().mockReturnValue("blob:mock-url");
    const revokeObjectURLMock = vi.fn();
    window.URL.createObjectURL = createObjectURLMock;
    window.URL.revokeObjectURL = revokeObjectURLMock;

    fireEvent.click(jsonBtn);
    expect(createObjectURLMock).toHaveBeenCalled();

    fireEvent.click(csvBtn);
    expect(createObjectURLMock).toHaveBeenCalledTimes(2);
  });
});

