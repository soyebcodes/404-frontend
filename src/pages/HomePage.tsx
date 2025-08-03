import { Link } from "react-router";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-6 text-center">
      <h1 className="text-4xl font-bold">🚧 404 Project Not Found</h1>
      <p className="text-gray-600">
        Welcome! Explore one of the sections below:
      </p>
      <div className="space-y-4">
        <Link
          to="/tasks"
          className="block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          🗂 Task Manager
        </Link>
        <Link
          to="/dashboard"
          className="block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          📊 Dashboard
        </Link>
        <Link
          to="/annotate"
          className="block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
        >
          🖍 Image Annotation
        </Link>
      </div>
    </div>
  );
}
