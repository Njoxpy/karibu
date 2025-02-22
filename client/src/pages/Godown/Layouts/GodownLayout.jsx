import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const NavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="px-4 py-2 rounded-lg hover:bg-blue-700 hover:text-white transition-all duration-200 flex items-center space-x-2"
  >
    {children}
  </Link>
);

function AnimalFeedingLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: "/godown/", label: "Home" },
    { path: "/godown/admin/upload", label: "Item Upload" },
    { path: "/godown/admin/bulk-upload", label: "Bulk Upload" },
    { path: "/godown/order-item", label: "Order Item" },
    { path: "/godown/orders", label: "Orders" },
    { path: "/godown/admin/move", label: "Move" },
    { path: "/godown/admin/manage", label: "Manage Godown" },
    { path: "/godown/admin/movement-logs", label: "Movement Logs" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-lg">
        <header className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h2 className="text-3xl font-bold tracking-tight">
              <Link
                to="/godown/"
                className="hover:text-blue-200 transition-colors duration-200"
              >
                Godown
              </Link>
            </h2>

            <button
              className="lg:hidden p-2 hover:bg-blue-800 rounded-lg transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>

            <nav className="hidden lg:block">
              <ul className="flex items-center space-x-2">
                {navItems.map(({ path, label }) => (
                  <li key={path}>
                    <NavLink to={path}>{label}</NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        {isMenuOpen && (
          <nav className="lg:hidden border-t border-blue-800">
            <ul className="flex flex-col p-4 space-y-2 bg-blue-900/50 backdrop-blur-sm">
              {navItems.map(({ path, label }) => (
                <li key={path}>
                  <NavLink to={path} onClick={() => setIsMenuOpen(false)}>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      <Outlet />
    </div>
  );
}

export default AnimalFeedingLayout;
