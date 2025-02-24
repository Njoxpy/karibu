import { useContext, useState } from "react";
import { AuthContext } from "../../../context/auth/AuthContext";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Outlet } from "react-router-dom";

function AnimalFeedingLayout() {
  const { user } = useContext(AuthContext); // Get the user data from context
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: "/animal-feeding/", label: "Home" },
    { path: "/animal-feeding/order-item", label: "Order Item" },
    { path: "/animal-feeding/orders", label: "Orders" },
  ];

  // Show admin-specific items only for admins
  if (user.role === "admin") {
    navItems.push(
      { path: "/animal-feeding/admin/upload", label: "Food Upload" },
      { path: "/animal-feeding/admin/manage", label: "Manage Food" }
    );
  }

  return (
    <>
      <div className="bg-gradient-to-r from-green-700 to-green-800 text-white shadow-md">
        <header className="container mx-auto flex justify-between items-center p-4">
          <h2 className="text-2xl font-semibold">
            <Link to="/animal-feeding/">Animal Feeding</Link>
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
                    className="hover:text-green-200 transition-colors duration-200"
                    to={path}
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
          <nav className="lg:hidden bg-green-700 p-4 space-y-4">
            <ul className="flex flex-col space-y-4">
              {navItems.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    className="hover:text-green-200 transition-colors duration-200"
                    to={path}
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

export default AnimalFeedingLayout;
