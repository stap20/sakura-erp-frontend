import { AppTable } from "@/components/shared/AppTable";
import type { ColumnDef } from "@/components/shared/AppTable";
import type { Material } from "../types";
import { AppButton } from "@/components/shared/AppButton";

interface InventoryTableProps {
  data: Material[];
  isLoading?: boolean;
}

export function InventoryTable({ data, isLoading }: InventoryTableProps) {
  const columns: ColumnDef<Material>[] = [
    { header: "Name", accessorKey: "name" },
    { header: "Type", accessorKey: "type" },
    { header: "Qty", cell: (row) => `${row.quantity} ${row.unit}` },
    { header: "Unit Price", cell: (row) => `$${row.unitPrice.toFixed(2)}` },
    {
      header: "Reorder Level",
      cell: (row) => `${row.reorderLevel} ${row.unit}`,
    },
    {
      header: "Status",
      cell: (row) => {
        const isLowStock = row.quantity <= row.reorderLevel;
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isLowStock
                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            }`}
          >
            {isLowStock ? "Low Stock" : "In Stock"}
          </span>
        );
      },
    },
    {
      header: "Actions",
      cell: () => (
        <div className="space-x-2">
          <AppButton variant="outline" size="sm">
            Edit
          </AppButton>
        </div>
      ),
    },
  ];

  return <AppTable columns={columns} data={data} isLoading={isLoading} />;
}
