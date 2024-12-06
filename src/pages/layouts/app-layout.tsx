import { Outlet } from "react-router-dom";
import { NavSidebar } from "../../components/nav-sidebar";

export function AppLayout() {
  return (
    <div className="h-dvh w-full flex">
      <NavSidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}