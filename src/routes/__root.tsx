import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 py-4 border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Sakura ERP
        </h1>
      </header>
      <main className="flex-1 bg-gray-50 dark:bg-zinc-950 p-6">
        <Outlet />
      </main>
    </div>
  ),
});
