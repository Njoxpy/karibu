import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const [openProfileDropdown, setOpenProfileDropdown] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setOpen(!open);

  const getTitle = () => {
    switch (location.pathname) {
      case "/admin/users":
        return "Users";
      case "/admin/reports":
        return "Reports";
      default:
        return "Dashboard";
    }
  };

  const handleLogout = () => {
    // Clear session, tokens, etc.
    console.log("Logging out...");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`bg-blue-500 text-white w-64 ${
          open ? "sidebar-open" : "sidebar-closed"
        } md:block sidebar-transition`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold">
            <NavLink to="/admin">Welcome Leon</NavLink>
          </h2>
        </div>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/admin/users"
              className="block py-2 px-4 hover:bg-blue-700"
              activeClassName="bg-blue-700"
            >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/reports"
              className="block py-2 px-4 hover:bg-blue-700"
              activeClassName="bg-blue-700"
            >
              Reports
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-100 p-6">
        {/* Mobile Navbar */}
        <div className="flex justify-between items-center mb-6">
          <button onClick={toggleSidebar} className="text-blue-500 md:hidden">
            {open ? "Close Sidebar" : "Open Sidebar"}
          </button>
          <h1 className="text-2xl font-semibold">{getTitle()}</h1>
          {/* Admin profile (mobile view) */}
          <div className="relative">
            <button
              className="text-blue-500"
              onClick={() => setOpenProfileDropdown(!openProfileDropdown)}
            >
              Admin
            </button>
            {openProfileDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                <ul className="py-1">
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-500 hover:text-white"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
