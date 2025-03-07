import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/shared/context/AuthContext";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { AuthBanner } from "@/components/AuthBanner";
import { AuthContent } from "@/components/AuthContent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kanban - Inventory Management",
  description: "Modern inventory management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-col h-screen">
            <AuthBanner />
            <div className="flex flex-1">
              <Sidebar />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <AuthContent>
                  <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
                    {children}
                  </main>
                </AuthContent>
              </div>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
