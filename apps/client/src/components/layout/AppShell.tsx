import { Outlet } from "react-router-dom";
import { MobileHeader } from "./MobileHeader";
import { Sidebar } from "./Sidebar";

export function AppShell() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <MobileHeader />
      <main className="lg:pl-64">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-9 lg:px-10 lg:py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
