import React, { useState } from "react";
import { Link } from "react-router-dom";

const OrdersPage = () => {
    // Static data (for now)
    const orders = [
        { id: "ORD123", customer: "John Doe", status: "Completed", date: "2024-12-01" },
        { id: "ORD124", customer: "Jane Smith", status: "Pending", date: "2024-12-02" },
        { id: "ORD125", customer: "Samuel Lee", status: "Shipped", date: "2024-12-03" },
        { id: "ORD126", customer: "Emily Davis", status: "Cancelled", date: "2024-12-04" },
        { id: "ORD127", customer: "Michael Johnson", status: "Completed", date: "2024-12-05" },
        { id: "ORD128", customer: "Sarah Brown", status: "Shipped", date: "2024-12-06" },
    ];

    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;

    // Handle search filtering
    const filteredOrders = orders.filter((order) =>
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle pagination logic
    const paginatedOrders = filteredOrders.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    // Pagination Controls
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    const handlePagination = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="p-5 bg-gray-100">
            <h1 className="text-3xl font-semibold mb-5">Order Management</h1>

            {/* Search Bar */}
            <div className="mb-5">
                <input
                    type="text"
                    className="p-2 border rounded w-full"
                    placeholder="Search by Order ID or Customer"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Orders Table */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <table className="min-w-full table-auto">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="py-3 px-4">Order ID</th>
                            <th className="py-3 px-4">Customer</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedOrders.map((order) => (
                            <tr key={order.id} className="border-t">
                                <td className="py-3 px-4">{order.id}</td>
                                <td className="py-3 px-4">{order.customer}</td>
                                <td className="py-3 px-4">
                                    <span
                                        className={`px-3 py-1 rounded-full ${order.status === "Completed"
                                            ? "bg-green-200 text-green-800"
                                            : order.status === "Pending"
                                                ? "bg-yellow-200 text-yellow-800"
                                                : order.status === "Shipped"
                                                    ? "bg-blue-200 text-blue-800"
                                                    : "bg-red-200 text-red-800"
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4">{order.date}</td>
                                <td className="py-3 px-4">
                                    <Link to={`/admin/orders/${order.id}`} className="text-blue-600 hover:text-blue-800">
                                        View Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-5 flex justify-between items-center">
                <button
                    onClick={() => handlePagination(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                    Previous
                </button>
                <span className="text-lg">
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => handlePagination(page + 1)}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default OrdersPage;
