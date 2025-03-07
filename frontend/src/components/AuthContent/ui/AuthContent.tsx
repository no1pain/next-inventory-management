"use client";

import React from "react";
import { useAuth } from "@/shared/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AuthContentProps {
  children: React.ReactNode;
}

export const AuthContent = ({ children }: AuthContentProps) => {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();

  // Don't apply blur effect on login and signup pages
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  // If user is authenticated or on an auth page, just render children normally
  if (isAuthenticated || isAuthPage) {
    return <div className="flex-1 overflow-hidden">{children}</div>;
  }

  return (
    <div className="relative flex-1 overflow-hidden">
      <div className="w-full h-full filter blur-sm pointer-events-none">
        {children}
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Login Required
          </h2>
          <p className="text-gray-600 mb-6">
            Please log in to view and interact with the dashboard content.
          </p>
          <Link
            href="/login"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthContent;
