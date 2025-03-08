import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath:
    process.env.NODE_ENV === "production" ? "/next-inventory-management" : "",
  images: {
    domains: ["randomuser.me", "ui-avatars.com", "via.placeholder.com"],
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_DEMO_MODE: "true",
  },
  // Comment out rewrites for static export
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://localhost:5001/api/:path*",
  //     },
  //   ];
  // },
};

export default nextConfig;
