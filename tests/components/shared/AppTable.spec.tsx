import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AppTable } from "@/components/shared/AppTable";
import type { ColumnDef } from "@/components/shared/AppTable";

describe("AppTable Component", () => {
  type MockData = {
    id: string;
    name: string;
  };

  const columns: ColumnDef<MockData>[] = [
    { header: "ID", accessorKey: "id" },
    { header: "Name", cell: (item) => <strong>{item.name}</strong> },
    { header: "Invalid" },
  ];

  const mockData: MockData[] = [
    { id: "1", name: "Test Item" },
    { id: "2", name: "Item 2" },
  ];

  it("renders correctly with data", () => {
    render(<AppTable columns={columns} data={mockData} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Test Item")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(<AppTable columns={columns} data={[]} isLoading={true} />);
    expect(screen.getByText("Loading data...")).toBeInTheDocument();
  });

  it("shows empty state when no data", () => {
    render(<AppTable columns={columns} data={[]} />);
    expect(screen.getByText("No results.")).toBeInTheDocument();
  });
});
