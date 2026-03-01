import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AppTable } from "@/components/shared/AppTable";

describe("AppTable Component", () => {
  const mockColumns = [
    { header: "Name", accessorKey: "name" as const },
    {
      header: "Action",
      cell: (item: any) => <button>Action {item.name}</button>,
    },
  ];
  const mockData = [{ name: "Test Item" }, { name: "Item 2" }];

  it("renders correctly with data", () => {
    render(<AppTable columns={mockColumns} data={mockData} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Test Item")).toBeInTheDocument();
    expect(screen.getByText("Action Test Item")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(<AppTable columns={mockColumns} data={[]} isLoading={true} />);
    expect(screen.getByText("Loading data...")).toBeInTheDocument();
  });

  it("shows empty state when no data", () => {
    render(<AppTable columns={mockColumns} data={[]} />);
    expect(screen.getByText("No results.")).toBeInTheDocument();
  });
});
