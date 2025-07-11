import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../context/auth/AuthContext";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

// NavLink component for better reusability
const NavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="px-3 py-2 rounded-lg hover:bg-blue-700 hover:text-white transition-all duration-200 flex items-center space-x-2 text-sm lg:text-base"
  >
    {children}
  </Link>
);

function AnimalFeedingLayout() {
  const { user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Base navigation items for everyone
  const navItems = [
    { path: "/godown/", label: "Home" },
    { path: "/godown/order-item", label: "Order Item" },
    { path: "/godown/orders", label: "Orders" },
  ];

  // Admin-specific navigation items
  if (user?.role === "admin") {
    navItems.push(
      { path: "/godown/admin/upload", label: "Item Upload" },
      { path: "/godown/admin/bulk-upload", label: "Bulk Upload" },
      { path: "/godown/admin/manage", label: "Manage Godown" },
      { path: "/godown/admin/move", label: "Move Products" },
      { path: "/godown/admin/movement-logs", label: "Movement Logs" }
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
        <header className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            {/* Logo/Title */}

            {/* Mobile menu button */}
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

            {/* Desktop navigation */}
            <nav className="hidden lg:block">
              <ul className="flex items-center space-x-2 xl:space-x-4">
                {navItems.map(({ path, label }) => (
                  <li key={path}>
                    <NavLink to={path}>{label}</NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        {/* Mobile navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-blue-800 overflow-hidden"
            >
              <ul className="flex flex-col p-4 space-y-2 bg-blue-900/95 backdrop-blur-md">
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

      {/* Main content */}

      <Outlet />
    </div>
  );
}

export default AnimalFeedingLayout;
