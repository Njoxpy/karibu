import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardHome from "./DashboardHome";
import ProductsPage from "./ProductsPage";
import OrdersPage from "./OrdersPage";
import UsersPage from "./UsersPage";
import ReportsPage from "./ReportsPage";
import SettingsPage from "./SettingsPage";
import AdminSidebar from "./AdminSidebar"; // Import your existing sidebar

const AdminDashboard = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto bg-gray-50">
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
                        <h1 className="text-lg font-semibold text-gray-900">Admin Dashboard</h1>
                    </div>
                </header>

                <main className="py-6 px-4 sm:px-6 lg:px-8">
                    <Routes>
                        <Route path="/" element={<DashboardHome />} />
                        <Route path="products" element={<ProductsPage />} />
                        <Route path="orders" element={<OrdersPage />} />
                        <Route path="users" element={<UsersPage />} />
                        <Route path="reports" element={<ReportsPage />} />
                        <Route path="settings" element={<SettingsPage />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
