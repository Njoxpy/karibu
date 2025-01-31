import { useState, useEffect, useRef } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  User,
  X,
  Home,
  Users,
  FileText,
  DollarSign,
  AlertCircle,
  ShoppingCart,
  BarChart3,
  Settings,
  Bell,
  Mail,
  HelpCircle,
  Shield,
  PlusCircle,
  ActivitySquare,
} from "lucide-react";
import useLogout from "../../../hooks/auth/useLogout";
import { useAuth } from "../../../hooks/auth/useAuth";
import { FaFirstOrder, FaFirstOrderAlt, FaProductHunt } from "react-icons/fa";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const [openProfileDropdown, setOpenProfileDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
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

  const handleLogout = () => {
    console.log("bomboclat!");
    logout();
  };

  // Enhanced navigation structure with grouping
  const navLinks = [
    // Overview Section
    {
      group: "Overview",
      items: [
        {
          path: "/admin/dashboard",
          label: "Dashboard",
          icon: <Home size={20} />,
        },
      ],
    },
    // User Management Section
    {
      group: "User Management",
      items: [
        {
          path: "/admin/users",
          label: "Users List",
          icon: <Users size={20} />,
        },
        {
          path: "/admin/users/create",
          label: "Add User",
          icon: <PlusCircle size={20} />,
        },
      ],
    },

    // Analytics & Reports Section
    {
      group: "Analytics & Reports",
      items: [
        {
          path: "/admin/reports",
          label: "Reports",
          icon: <FileText size={20} />,
        },
        {
          path: "/admin/revenue",
          label: "Revenue",
          icon: <DollarSign size={20} />,
        },
      ],
    },
    // System Section
    {
      group: "System",
      items: [
        {
          path: "/admin/settings",
          label: "Settings",
          icon: <Settings size={20} />,
        },
      ],
    },
    // Communication Section
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

      {/* Enhanced Sidebar */}
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
          {/* Enhanced Logo area */}
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
            <div className="text-sm text-blue-100">Welcome, {user.email}</div>
          </div>

          {/* Enhanced Navigation with Groups */}
          <nav className="flex-1 overflow-y-auto py-4">
            {navLinks.map((group, index) => (
              <div key={index} className="mb-6">
                <div className="px-4 mb-2 text-sm font-semibold text-blue-200">
                  {group.group}
                </div>
                <ul className="space-y-1">
                  {group.items.map((item) => (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center justify-between px-4 py-2 transition-colors
                          ${
                            isActive
                              ? "bg-blue-700 text-white"
                              : "hover:bg-blue-700/50"
                          }`
                        }
                      >
                        <div className="flex items-center">
                          <span className="mr-2">{item.icon}</span>
                          {item.label}
                        </div>
                        {item.badge && (
                          <span className="px-2 py-1 text-xs bg-blue-500 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Help & Support Section */}
          <div className="p-4 border-t border-blue-500">
            <NavLink
              to="/admin/support"
              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-blue-700/50 rounded-lg"
            >
              <HelpCircle size={20} />
              <span>Help & Support</span>
            </NavLink>
          </div>
        </div>
      </aside>

      {/* Enhanced Main content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Enhanced Top navigation bar */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setOpen(!open)}
                className="p-2 -ml-2 md:hidden hover:bg-gray-100 rounded-lg"
                aria-label="Toggle sidebar"
              >
                {open ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-xl font-semibold text-blue-600">
                {getTitle()}
              </h1>
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
