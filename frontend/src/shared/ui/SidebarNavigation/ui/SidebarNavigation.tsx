import React from "react";
import { NavItem } from "../../NavItem/ui/NavItem";
import Image from "next/image";

const SidebarNavigation = () => {
  return (
    <div>
      <div className="mb-4 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-5">
          <Image
            src="/images/sidebar-logo.png"
            alt="Inventory Management Logo"
            width={1000}
            height={48}
          />
        </div>
      </div>

      <nav>
        <ul className="space-y-6">
          <NavItem
            href="/"
            icon={
              <Image
                src="/images/dashboard-icon.svg"
                alt="Dashboard"
                width={24}
                height={24}
                className="text-blue-500"
              />
            }
            title="Dashboard"
            isActive={true}
          />
          <NavItem
            href="/inventory"
            icon={
              <Image
                src="/images/inventory-icon.svg"
                alt="Inventory"
                width={24}
                height={24}
              />
            }
            title="Inventory"
          />
          <NavItem
            href="/reports"
            icon={
              <Image
                src="/images/reports-icon.svg"
                alt="Reports"
                width={24}
                height={24}
              />
            }
            title="Reports"
          />
          <NavItem
            href="/suppliers"
            icon={
              <Image
                src="/images/supplier-icon.svg"
                alt="Suppliers"
                width={24}
                height={24}
              />
            }
            title="Suppliers"
          />
          <NavItem
            href="/orders"
            icon={
              <Image
                src="/images/orders-icon.svg"
                alt="Orders"
                width={24}
                height={24}
              />
            }
            title="Orders"
          />
          <NavItem
            href="/manage-store"
            icon={
              <Image
                src="/images/managestore-icon.svg"
                alt="Manage Store"
                width={24}
                height={24}
              />
            }
            title="Manage Store"
          />
        </ul>
      </nav>
    </div>
  );
};

export default SidebarNavigation;
