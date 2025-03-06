import { Sidebar } from "@/components/Sidebar";

export default function Dashboard() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-gray-600">
          Welcome to your inventory management dashboard.
        </p>
      </div>
    </div>
  );
}
