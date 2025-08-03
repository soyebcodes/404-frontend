import { NavLink } from "react-router";

export default function Navbar() {
  const baseClass = "px-3 py-2 rounded hover:underline";
  const activeClass = "font-bold text-blue-600 underline";

  return (
    <nav className="flex space-x-6 p-4 bg-gray-100 shadow">
      <NavLink
        to="/tasks"
        className={({ isActive }) =>
          isActive ? `${baseClass} ${activeClass}` : baseClass
        }
      >
        🗂 Tasks
      </NavLink>

      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive ? `${baseClass} ${activeClass}` : baseClass
        }
      >
        📊 Dashboard
      </NavLink>

      <NavLink
        to="/annotate"
        className={({ isActive }) =>
          isActive ? `${baseClass} ${activeClass}` : baseClass
        }
      >
        🖍 Annotate
      </NavLink>

      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? `${baseClass} ${activeClass} ml-auto`
            : `${baseClass} ml-auto`
        }
      >
        🏠 Home
      </NavLink>
    </nav>
  );
}
