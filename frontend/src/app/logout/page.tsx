export default function Logout() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Logout</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-gray-600">You have been logged out.</p>
        <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          Log back in
        </button>
      </div>
    </div>
  );
}
