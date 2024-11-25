import React from "react";

const OrdersPage = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800">Manage Orders</h2>
            <table className="min-w-full mt-4 bg-white shadow rounded-lg">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-left text-gray-600">Order ID</th>
                        <th className="px-4 py-2 text-left text-gray-600">Customer</th>
                        <th className="px-4 py-2 text-left text-gray-600">Total</th>
                        <th className="px-4 py-2 text-left text-gray-600">Status</th>
                        <th className="px-4 py-2 text-left text-gray-600">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Map through orders */}
                    <tr>
                        <td className="px-4 py-2">12345</td>
                        <td className="px-4 py-2">John Doe</td>
                        <td className="px-4 py-2">$100.00</td>
                        <td className="px-4 py-2">Shipped</td>
                        <td className="px-4 py-2">
                            <button className="text-indigo-600 hover:underline">View</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default OrdersPage;
