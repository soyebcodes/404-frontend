import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="flex space-x-6 p-4 bg-gray-100 shadow">
      <Link to="/tasks" className="hover:text-blue-600">
        🗂 Tasks
      </Link>
      <Link to="/dashboard" className="hover:text-green-600">
        📊 Dashboard
      </Link>
      <Link to="/annotate" className="hover:text-purple-600">
        🖍 Annotate
      </Link>
      <Link to="/" className="ml-auto hover:text-gray-600">
        🏠 Home
      </Link>
    </nav>
  );
}
