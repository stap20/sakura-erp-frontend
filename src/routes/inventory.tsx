import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "./__root";
import { Link } from "@tanstack/react-router";
import { AppButton } from "@/components/shared/AppButton";
import { InventoryTable } from "@/features/inventory/components/InventoryTable";
import { MaterialForm } from "@/features/inventory/components/MaterialForm";
import { MaterialType } from "@/features/inventory/types";
import type { Material } from "@/features/inventory/types";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const MOCK_DATA: Material[] = [
  {
    id: "1",
    name: "Jasmine Fragrance Oil",
    type: MaterialType.RAW_MATERIAL,
    unit: "ml",
    quantity: 5000,
    unitPrice: 0.15,
    reorderLevel: 1000,
  },
  {
    id: "2",
    name: "Glass Dropper Bottle 30ml",
    type: MaterialType.PACKAGING,
    unit: "pcs",
    quantity: 250,
    unitPrice: 1.2,
    reorderLevel: 500,
  },
];

function InventoryDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [materials, setMaterials] = useState<Material[]>(MOCK_DATA);

  const handleCreateMaterial = async (data: any) => {
    // Mock API call
    console.log("Creating material:", data);
    const newMaterial = { ...data, id: Math.random().toString() };
    setMaterials([...materials, newMaterial]);
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Inventory Management
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage your raw materials and packaging supplies.
          </p>
        </div>

        <div className="flex gap-2">
          <Link to="/">
            <AppButton variant="outline">Back to Dashboard</AppButton>
          </Link>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <AppButton>Register Product</AppButton>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Register New Material</DialogTitle>
              </DialogHeader>
              <MaterialForm
                onSubmit={handleCreateMaterial}
                onCancel={() => setIsOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 p-6">
        <InventoryTable data={materials} />
      </div>
    </div>
  );
}

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/inventory",
  component: InventoryDashboard,
});
