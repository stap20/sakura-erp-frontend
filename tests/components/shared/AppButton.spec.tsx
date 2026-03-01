import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AppButton } from "@/components/shared/AppButton";

describe("AppButton Component", () => {
  it("renders correctly", () => {
    render(<AppButton>Click Me</AppButton>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("shows loading spinner when isLoading is true", () => {
    const { container } = render(<AppButton isLoading>Loading</AppButton>);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("disables the button when isLoading is true", () => {
    render(<AppButton isLoading>Loading</AppButton>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
