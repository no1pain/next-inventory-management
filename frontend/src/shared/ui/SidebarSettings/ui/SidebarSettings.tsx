"use client";

import React, { useState } from "react";
import { NavItem } from "../../NavItem";
import Image from "next/image";
import { ConfirmationModal } from "../../Modal";
import { useAuth } from "@/shared/context/AuthContext";
import { useRouter } from "next/navigation";

const SidebarSettings = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

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
        <li
          onClick={() => setIsLogoutModalOpen(true)}
          className="cursor-pointer"
        >
          <div className="flex items-center gap-4 py-4 px-5 rounded-lg transition-colors hover:bg-gray-50 w-full text-left">
            <span className="flex items-center justify-center w-6 h-6 text-gray-500">
              <Image
                src="/images/logout-icon.svg"
                alt="Log Out"
                width={24}
                height={24}
              />
            </span>
            <span className="font-medium text-gray-500">Log Out</span>
          </div>
        </li>
      </ul>

      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        confirmText="Log Out"
        cancelText="Cancel"
      />
    </div>
  );
};

export default SidebarSettings;
