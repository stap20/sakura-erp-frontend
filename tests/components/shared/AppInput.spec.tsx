import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AppInput } from "@/components/shared/AppInput";

describe("AppInput Component", () => {
  it("renders correctly", () => {
    render(<AppInput placeholder="Test Input" />);
    expect(screen.getByPlaceholderText("Test Input")).toBeInTheDocument();
  });

  it("renders a label if provided", () => {
    render(<AppInput label="Username" id="user-input" />);
    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  it("renders an error message if provided", () => {
    render(<AppInput error="Required field" />);
    expect(screen.getByText("Required field")).toBeInTheDocument();
  });
});
