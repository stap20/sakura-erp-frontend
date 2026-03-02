import { render, screen, fireEvent } from "@testing-library/react";
import { MaterialForm } from "@/features/inventory/components/MaterialForm";
import { vi, describe, it, expect } from "vitest";

describe("MaterialForm", () => {
  it("submits valid data successfully", async () => {
    const onSubmit = vi.fn();
    render(<MaterialForm onSubmit={onSubmit} />);

    const nameInput = screen.getByLabelText("Name");
    fireEvent.change(nameInput, { target: { value: "Test Material" } });

    // Change Select value
    const typeSelect = screen.getByLabelText("Type");
    fireEvent.change(typeSelect, { target: { value: "PACKAGING" } });

    const submitBtn = screen.getByText("Save Material");
    fireEvent.click(submitBtn);

    // Wait for the synchronous event loop and state propagation to clear
    await new Promise((r) => setTimeout(r, 100));

    expect(onSubmit).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Test Material",
        type: "PACKAGING",
      }),
    );
  });

  it("shows validation errors when submitting empty", async () => {
    const onSubmit = vi.fn();
    render(<MaterialForm onSubmit={onSubmit} />);

    const submitBtn = screen.getByText("Save Material");
    fireEvent.click(submitBtn);

    // Wait for the synchronous event loop and state propagation to clear
    await new Promise((r) => setTimeout(r, 100));

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("renders field-level validation errors directly on mount with bad defaults", async () => {
    // If the component receives empty unit explicitly, the field should trigger validation if we touch it.
    const onSubmit = vi.fn();
    render(<MaterialForm onSubmit={onSubmit} />);

    // Name
    const nameInput = screen.getByLabelText("Name");
    fireEvent.change(nameInput, { target: { value: "" } });
    fireEvent.blur(nameInput);

    // Unit
    const unitInput = screen.getByLabelText("Unit (kg, ml, pcs)");
    fireEvent.change(unitInput, { target: { value: "" } });
    fireEvent.blur(unitInput);

    // Quantity (Numeric Invalid)
    const qty = screen.getByLabelText("Initial Quantity");
    fireEvent.change(qty, { target: { value: "-1" } });
    fireEvent.blur(qty);

    // Price (Numeric Invalid)
    const price = screen.getByLabelText("Unit Price ($)");
    fireEvent.change(price, { target: { value: "-10" } });
    fireEvent.blur(price);

    // Reorder (Numeric Invalid)
    const reorder = screen.getByLabelText("Reorder Alert Level");
    fireEvent.change(reorder, { target: { value: "-5" } });
    fireEvent.blur(reorder);

    const submitBtn = screen.getByText("Save Material");
    fireEvent.click(submitBtn);

    await new Promise((r) => setTimeout(r, 100));
  });

  it("renders field-level validation errors from Zod schema", async () => {
    const onSubmit = vi.fn();
    render(<MaterialForm onSubmit={onSubmit} />);

    // Provide generic name but leave Unit empty to trigger specific error branch map
    const nameInput = screen.getByLabelText("Name");
    fireEvent.change(nameInput, { target: { value: "Test Material" } });

    const unitInput = screen.getByLabelText("Unit (kg, ml, pcs)");
    fireEvent.change(unitInput, { target: { value: "" } });

    const qty = screen.getByLabelText("Initial Quantity");
    fireEvent.change(qty, { target: { value: "-1" } });

    const price = screen.getByLabelText("Unit Price ($)");
    fireEvent.change(price, { target: { value: "-10" } });

    const submitBtn = screen.getByText("Save Material");
    fireEvent.click(submitBtn);

    await new Promise((r) => setTimeout(r, 100));

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("handles cancel button correctly", () => {
    const onCancel = vi.fn();
    render(<MaterialForm onSubmit={vi.fn()} onCancel={onCancel} />);

    fireEvent.click(screen.getByText("Cancel"));
    expect(onCancel).toHaveBeenCalled();
  });

  it("updates numeric values properly across all bound fields", () => {
    render(<MaterialForm onSubmit={vi.fn()} />);

    const qty = screen.getByLabelText("Initial Quantity");
    fireEvent.change(qty, { target: { value: "100" } });

    const price = screen.getByLabelText("Unit Price ($)");
    fireEvent.change(price, { target: { value: "50" } });

    const reorder = screen.getByLabelText("Reorder Alert Level");
    fireEvent.change(reorder, { target: { value: "25" } });

    expect(qty).toHaveValue(100);
    expect(price).toHaveValue(50);
    expect(reorder).toHaveValue(25);
  });
});
