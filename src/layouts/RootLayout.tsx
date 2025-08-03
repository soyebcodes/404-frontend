import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar";

export default function RootLayout() {
  const location = useLocation();

  const showNavbar = location.pathname !== "/";
  return (
    <div className="min-h-screen flex flex-col">
      {showNavbar && <Navbar />}
      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  );
}
