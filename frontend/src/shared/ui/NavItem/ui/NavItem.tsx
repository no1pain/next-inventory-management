import Link from "next/link";
import React from "react";

interface NavItemProps {
  href: any;
  icon: any;
  title: string;
  isActive?: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({
  href,
  icon,
  title,
  isActive = false,
}) => {
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
