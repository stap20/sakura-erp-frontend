import { useState } from "react";
import { AppButton } from "@/components/shared/AppButton";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8 bg-gray-50 dark:bg-zinc-950">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        Sakura ERP
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Inventory & Formulation Management System
      </p>

      <div className="p-8 space-y-4 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800">
        <p className="text-center font-medium">Interactive Demo</p>
        <div className="flex justify-center">
          <AppButton onClick={() => setCount((c) => c + 1)}>
            Count is {count}
          </AppButton>
        </div>
      </div>
    </div>
  );
}

export default App;
