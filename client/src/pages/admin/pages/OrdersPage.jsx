import { useState } from "react";
import { Link } from "react-router-dom";

const OrdersPage = () => {
    // Hardcoded orders for each category
    const ordersData = {
        "animal-feeding": [
            { id: "ORD123", customer: "Godbless Nyagawa", status: "Completed", date: "2024-12-01" },
            { id: "ORD124", customer: "Chemakeke Kingunge", status: "Pending", date: "2024-12-02" },
            { id: "ORD125", customer: "Salum Mwijaku", status: "Completed", date: "2024-12-03" },
        ],
        "fresh-oil": [
            { id: "ORD130", customer: "Anna Bwana", status: "Completed", date: "2024-12-01" },
            { id: "ORD131", customer: "Sarah Lee", status: "Pending", date: "2024-12-05" },
            { id: "ORD132", customer: "Tomo Imani", status: "Cancelled", date: "2024-12-07" },
        ],
        "godown": [
            { id: "ORD140", customer: "William Sande", status: "Completed", date: "2024-12-02" },
            { id: "ORD141", customer: "John Doe", status: "Pending", date: "2024-12-03" },
        ],
        "hardware": [
            { id: "ORD150", customer: "Sarah Brown", status: "Completed", date: "2024-12-04" },
            { id: "ORD151", customer: "Chemakeke Kingunge", status: "Pending", date: "2024-12-06" },
        ],
        "printing": [
            { id: "ORD160", customer: "Alex Smith", status: "Completed", date: "2024-12-01" },
            { id: "ORD161", customer: "Mariam Tomson", status: "Cancelled", date: "2024-12-05" },
        ],
        "stationery": [
            { id: "ORD170", customer: "Sarah Kongo", status: "Completed", date: "2024-12-02" },
            { id: "ORD171", customer: "Joseph Mayoka", status: "Pending", date: "2024-12-06" },
        ],
    };

    const [orders, setOrders] = useState(ordersData["animal-feeding"]);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("animal-feeding");
    const itemsPerPage = 5;

    // Change orders based on selected category
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setOrders(ordersData[category]);
        setPage(1); // Reset to first page when category changes
    };

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

            {/* Category Filter */}
            <div className="mb-5">
                <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="animal-feeding">Animal Feeding</option>
                    <option value="fresh-oil">Fresh Oil</option>
                    <option value="godown">Godown</option>
                    <option value="hardware">Hardware</option>
                    <option value="printing">Printing</option>
                    <option value="stationery">Stationery</option>
                </select>
            </div>

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
                        {paginatedOrders.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-3">No orders found</td>
                            </tr>
                        ) : (
                            paginatedOrders.map((order) => (
                                <tr key={order.id} className="border-t">
                                    <td className="py-3 px-4">{order.id}</td>
                                    <td className="py-3 px-4">{order.customer}</td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`px-3 py-1 rounded-full ${order.status === "Completed"
                                                ? "bg-green-200 text-green-800"
                                                : order.status === "Pending"
                                                    ? "bg-yellow-200 text-yellow-800"
                                                    : order.status === "Cancelled"
                                                        ? "bg-red-200 text-red-800"
                                                        : "bg-gray-200 text-gray-800"
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
                            ))
                        )}
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
