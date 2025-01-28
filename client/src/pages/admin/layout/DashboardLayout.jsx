import { ChevronDown, Menu, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const [openProfileDropdown, setOpenProfileDropdown] = useState(false);
  const location = useLocation();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openProfileDropdown && !event.target.closest(".profile-dropdown")) {
        setOpenProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openProfileDropdown]);

  const getTitle = () => {
    switch (location.pathname) {
      case "/admin/users":
      case "/admin/users/create":
        return "Users";
      case "/admin/reports":
        return "Reports";
      case "/admin/revenue":
        return "Revenue";
      case "/admin/logs":
        return "Logs";
      case "/admin/orders-cost":
        return "Orders-Cost";
      default:
        return "Dashboard";
    }
  };

  const handleLogout = () => {
    // Clear session, tokens, etc.
    console.log("Logging out...");
  };

  const navLinks = [
    { path: "/admin/users", label: "Users" },
    { path: "/admin/users/create", label: "Add User" },
    { path: "/admin/reports", label: "Reports" },
    { path: "/admin/revenue", label: "Revenue" },
    { path: "/admin/logs", label: "Logs" },
    { path: "/admin/orders-cost", label: "Orders-Cost" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-30
          w-64 bg-blue-600 text-white
          transform transition-transform duration-200 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo area */}
          <div className="p-4 border-b border-blue-500">
            <NavLink
              to="/admin"
              className="text-2xl font-bold hover:text-blue-100 transition-colors"
            >
              Welcome Leon
            </NavLink>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1">
              {navLinks.map(({ path, label }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 transition-colors
                      ${
                        isActive
                          ? "bg-blue-700 text-white"
                          : "hover:bg-blue-700/50"
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top navigation bar */}
        <header className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setOpen(!open)}
                className="p-2 -ml-2 md:hidden hover:bg-gray-100 rounded-lg"
                aria-label="Toggle sidebar"
              >
                {open ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-xl font-semibold text-gray-800">
                {getTitle()}
              </h1>
            </div>

            {/* Profile dropdown */}
            <div className="relative profile-dropdown">
              <button
                onClick={() => setOpenProfileDropdown(!openProfileDropdown)}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
              >
                <User size={20} />
                <span className="hidden sm:inline">Admin</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    openProfileDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
