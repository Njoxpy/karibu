import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../context/auth/AuthContext"; // Adjust the import path
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

// NavLink component for better reusability
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
  const { user } = useContext(AuthContext); // Get user from context
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Base navigation items for everyone
  const navItems = [
    { path: "/godown/", label: "Home" },
    { path: "/godown/order-item", label: "Order Item" },
    { path: "/godown/orders", label: "Orders" },
    { path: "/godown/admin/move", label: "Move" },
    { path: "/godown/admin/movement-logs", label: "Movement Logs" },
  ];

  // Admin-specific navigation items
  if (user?.role === "admin") {
    navItems.push(
      { path: "/godown/admin/upload", label: "Item Upload" },
      { path: "/godown/admin/bulk-upload", label: "Bulk Upload" },
      { path: "/godown/admin/manage", label: "Manage Godown" }
    );
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== "admin") {
      const restrictedPaths = [
        "/godown/admin/upload",
        "/godown/admin/manage",
        "/godown/admin/bulk-upload",
        "/godown/admin/move",
        "/godown/admin/movement-logs",
      ];
      if (restrictedPaths.includes(window.location.pathname)) {
        navigate("/godown");
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-lg">
        <header className="container mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            <h2 className="text-3xl font-bold tracking-tight">
              <Link
                to="/godown/"
                className="hover:text-blue-300 transition-colors duration-200"
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
              <ul className="flex items-center space-x-4">
                {navItems.map(({ path, label }) => (
                  <li key={path}>
                    <NavLink to={path}>{label}</NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden border-t border-blue-800"
            >
              <ul className="flex flex-col p-4 space-y-3 bg-blue-900/80 backdrop-blur-md">
                {navItems.map(({ path, label }) => (
                  <li key={path}>
                    <NavLink to={path} onClick={() => setIsMenuOpen(false)}>
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      <Outlet />
    </div>
  );
}

export default AnimalFeedingLayout;
