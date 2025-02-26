import { useState, useEffect, useRef } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  User,
  X,
  Home,
  Users,
  FileText,
  DollarSign,
  Settings,
  HelpCircle,
  Shield,
} from "lucide-react";
import useLogout from "../../../hooks/auth/useLogout";
import { useAuth } from "../../../hooks/auth/useAuth";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const [openProfileDropdown, setOpenProfileDropdown] = useState(false);
  const location = useLocation();
  const profileDropdownRef = useRef(null);
  const logout = useLogout();
  const { user } = useAuth();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openProfileDropdown &&
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setOpenProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openProfileDropdown]);

  const handleLogout = () => {
    logout();
  };

  const getTitle = () => {
    switch (location.pathname) {
      case "/admin/dashboard":
        return "Dashboard Overview";
      case "/admin/users":
        return "User Management";
      case "/admin/users/create":
        return "Create New User";
      case "/admin/reports":
        return "Analytics Reports";
      case "/admin/revenue":
        return "Revenue Analytics";
      case "/admin/settings":
        return "System Settings";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-blue-600 text-white transform transition-transform duration-200 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-blue-500">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={24} />
              <NavLink
                to="/admin"
                className="text-2xl font-bold hover:text-blue-100 transition-colors"
              >
                Admin Portal
              </NavLink>
            </div>
            <div className="text-sm text-blue-100">Welcome {user?.email}</div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 space-y-1">
            {[
              { to: "/admin/dashboard", label: "Dashboard", icon: Home },
              { to: "/admin/users", label: "Users", icon: Users },
              { to: "/admin/reports", label: "Reports", icon: FileText },
              { to: "/admin/revenue", label: "Revenue", icon: DollarSign },
              { to: "/admin/settings", label: "Settings", icon: Settings },
            ].map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-white text-blue-600 font-semibold shadow-md"
                      : "text-white hover:bg-blue-700"
                  }`
                }
              >
                <Icon size={20} className="mr-2" />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Help & Support */}
          <div className="p-4 border-t border-blue-500">
            <NavLink
              to="/admin/support"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm rounded-lg transition ${
                  isActive
                    ? "bg-white text-blue-600 font-semibold shadow-md"
                    : "text-white hover:bg-blue-700/50"
                }`
              }
            >
              <HelpCircle size={20} className="mr-2" />
              Help & Support
            </NavLink>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setOpen(!open)}
                className="p-2 -ml-2 md:hidden hover:bg-gray-100 rounded-lg"
              >
                {open ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-xl font-semibold text-blue-600">
                {getTitle()}
              </h1>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenProfileDropdown(!openProfileDropdown)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <User size={20} />
                <ChevronDown size={20} />
              </button>

              {openProfileDropdown && (
                <div
                  ref={profileDropdownRef}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg"
                >
                  <div className="px-4 py-2 text-sm text-gray-700">
                    {user?.email}
                  </div>
                  <hr className="border-gray-200" />
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-sm text-red-500 hover:bg-red-600/10"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
