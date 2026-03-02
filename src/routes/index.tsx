import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "./__root";
import { AppButton } from "@/components/shared/AppButton";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

function Index() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center space-y-8 mt-12">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Welcome to your ERP Control Center.
      </p>

      <div className="p-8 space-y-4 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800">
        <p className="text-center font-medium">Interactive Demo</p>
        <div className="flex gap-4 justify-center">
          <AppButton onClick={() => setCount((c) => c + 1)}>
            Count is {count}
          </AppButton>
          <Link to="/inventory">
            <AppButton variant="outline">Go to Inventory</AppButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Index,
});
