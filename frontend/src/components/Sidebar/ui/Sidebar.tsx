"use client";

import SidebarNavigation from "@/shared/ui/SidebarNavigation/ui/SidebarNavigation";
import SidebarSettings from "@/shared/ui/SidebarSettings/ui/SidebarSettings";

export const Sidebar = () => {
  return (
    <aside className="w-70 h-screen bg-white border-r-[1px] rounded-br-xl border-b-[1px] border-gray-200 p-4 flex flex-col justify-between">
      <SidebarNavigation />
      <SidebarSettings />
    </aside>
  );
};

export default Sidebar;
