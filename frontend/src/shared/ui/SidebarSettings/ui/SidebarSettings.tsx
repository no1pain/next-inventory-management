import React from "react";
import { NavItem } from "../../NavItem";
import Image from "next/image";

const SidebarSettings = () => {
  return (
    <div className="mt-auto">
      <ul className="space-y-6">
        <NavItem
          href="/settings"
          icon={
            <Image
              src="/images/settings-icon.svg"
              alt="Settings"
              width={24}
              height={24}
            />
          }
          title="Settings"
        />
        <NavItem
          href="/logout"
          icon={
            <Image
              src="/images/logout-icon.svg"
              alt="Log Out"
              width={24}
              height={24}
            />
          }
          title="Log Out"
        />
      </ul>
    </div>
  );
};

export default SidebarSettings;
