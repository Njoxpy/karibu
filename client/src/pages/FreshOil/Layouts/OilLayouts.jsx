import { useContext, useState } from "react";
import { AuthContext } from "../../../context/auth/AuthContext"; // Adjust the import based on your file structure
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Outlet } from "react-router-dom";

function OilLayouts() {
  const { user } = useContext(AuthContext); // Get the user from AuthContext
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: "/fresh-oil/", label: "Home" },
    { path: "/fresh-oil/order-item", label: "Order Item" },
    { path: "/fresh-oil/orders", label: "Orders" },
  ];

  // Admin-specific items will only be added for admins
  if (user.role === "admin") {
    navItems.push(
      { path: "/fresh-oil/admin/upload", label: "Oil Upload" },
      { path: "/fresh-oil/admin/manage", label: "Manage Oil" }
    );
  }

  return (
    <>
      <div className="bg-yellow-600 text-white">
        <header className="container mx-auto flex justify-between items-center p-4">
          <h2 className="text-2xl font-semibold">
            <Link to="/fresh-oil/">Fresh Oil</Link>
          </h2>

          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <XMarkIcon className="w-6 h-6 text-white" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-white" />
            )}
          </button>

          {/* Navigation Links for Desktop */}
          <nav className="hidden lg:flex space-x-6">
            <ul className="flex space-x-6">
              {navItems.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="hover:text-yellow-200 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        {/* Mobile Navigation Links */}
        {isMenuOpen && (
          <nav className="lg:hidden bg-yellow-600 p-4 space-y-4">
            <ul className="flex flex-col space-y-4">
              {navItems.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="hover:text-yellow-200 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
      <Outlet />
    </>
  );
}

export default OilLayouts;
