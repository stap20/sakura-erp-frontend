import { render, screen } from "@testing-library/react";
import { InventoryTable } from "@/features/inventory/components/InventoryTable";
import { MaterialType } from "@/features/inventory/types";

describe("InventoryTable", () => {
  const mockData = [
    {
      id: "1",
      name: "Test Raw Material",
      type: MaterialType.RAW_MATERIAL,
      unit: "kg",
      quantity: 50,
      unitPrice: 10,
      reorderLevel: 20,
    },
    {
      id: "2",
      name: "Test Packaging Low",
      type: MaterialType.PACKAGING,
      unit: "pcs",
      quantity: 5,
      unitPrice: 2,
      reorderLevel: 10,
    },
  ];

  it("renders the table with data", () => {
    render(<InventoryTable data={mockData} />);

    expect(screen.getByText("Test Raw Material")).toBeInTheDocument();
    expect(screen.getByText("Test Packaging Low")).toBeInTheDocument();
  });

  it("shows low stock indicator when quantity <= reorderLevel", () => {
    render(<InventoryTable data={mockData} />);

    expect(screen.getByText("In Stock")).toBeInTheDocument(); // Item 1
    expect(screen.getByText("Low Stock")).toBeInTheDocument(); // Item 2
  });

  it("renders a loading state", () => {
    render(<InventoryTable data={[]} isLoading={true} />);
    expect(screen.getByText("Loading data...")).toBeInTheDocument();
  });
});
