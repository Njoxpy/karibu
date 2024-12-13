// src/pages/admin/DashboardLayout.jsx
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    const [open, setOpen] = useState(false);
    const [openProfileDropdown, setOpenProfileDropdown] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => setOpen(!open);

    const getTitle = () => {
        switch (location.pathname) {
            case "/admin/products":
                return "Products";
            case "/admin/orders":
                return "Orders";
            case "/admin/users":
                return "Users";
            case "/admin/reports":
                return "Reports";
            default:
                return "Dashboard";
        }
    };

    const handleLogout = () => {
        // Add your logout logic here (e.g., clear session, redirect, etc.)
        console.log("Logging out...");
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className={`bg-blue-500 text-white w-64 ${open ? "block" : "hidden"} md:block`}>
                <div className="p-4">
                    <h2 className="text-2xl font-bold">Welcome Leon</h2>
                </div>
                <ul className="space-y-4">
                    <li>
                        <Link to="/admin/products" className="block py-2 px-4 hover:bg-blue-700">
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/orders" className="block py-2 px-4 hover:bg-blue-700">
                            Orders
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/users" className="block py-2 px-4 hover:bg-blue-700">
                            Users
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/reports" className="block py-2 px-4 hover:bg-blue-700">
                            Reports
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Main content */}
            <div className="flex-1 bg-gray-100 p-6">
                {/* Mobile Navbar */}
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={toggleSidebar}
                        className="text-blue-500 md:hidden"
                    >
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
                                        <Link
                                            to="/admin/settings"
                                            className="block px-4 py-2 text-gray-700 hover:bg-blue-500 hover:text-white"
                                        >
                                            Settings
                                        </Link>
                                    </li>
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
