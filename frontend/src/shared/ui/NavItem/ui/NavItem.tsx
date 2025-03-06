"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  isActive?: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({
  href,
  icon,
  title,
  isActive: forcedIsActive,
}) => {
  const pathname = usePathname();
  const isActive =
    forcedIsActive !== undefined ? forcedIsActive : pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={`flex items-center gap-4 py-3 px-4 rounded-lg transition-colors ${
          isActive ? "bg-blue-50" : "hover:bg-gray-50"
        }`}
      >
        <span
          className={`flex items-center justify-center w-6 h-6 ${
            isActive ? "text-blue-500" : "text-gray-500"
          }`}
        >
          {icon}
        </span>
        <span
          className={`font-medium ${
            isActive ? "text-blue-500" : "text-gray-500"
          }`}
        >
          {title}
        </span>
      </Link>
    </li>
  );
};
