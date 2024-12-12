import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // For extracting the orderId from the URL

const OrderDetailsPage = () => {
    const { orderId } = useParams(); // Getting the orderId from the URL
    const [order, setOrder] = useState(null); // State to hold the fetched order details
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // Simulating fetching order data based on the orderId
        const fetchOrderDetails = async () => {
            try {
                // Replace this with your actual API endpoint or data fetching logic
                const fetchedOrder = {
                    id: orderId,
                    customer: "John Doe",
                    status: "Completed",
                    date: "2024-12-01",
                    items: [
                        { productName: "Laptop", quantity: 1, price: 999.99 },
                        { productName: "Mouse", quantity: 1, price: 25.5 },
                    ],
                };

                setOrder(fetchedOrder); // Set the fetched order data
                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error("Error fetching order details", error);
                setLoading(false);
            }
        };

        fetchOrderDetails(); // Fetch the order details when the component mounts
    }, [orderId]); // Trigger fetch if the orderId changes

    if (loading) {
        return (
            <div className="p-5">
                <h1 className="text-2xl font-semibold">Loading...</h1>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="p-5">
                <h1 className="text-2xl font-semibold text-red-500">Order not found!</h1>
            </div>
        );
    }

    return (
        <div className="p-5 bg-gray-100">
            <h1 className="text-3xl font-semibold mb-5">Order Details</h1>

            {/* Order Info Section */}
            <div className="bg-white shadow-lg rounded-lg p-5 mb-5">
                <h2 className="text-2xl font-semibold mb-3">Order Information</h2>
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Customer:</strong> {order.customer}</p>
                <p><strong>Status:</strong>
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
                </p>
                <p><strong>Date:</strong> {order.date}</p>
            </div>

            {/* Order Items Section */}
            <div className="bg-white shadow-lg rounded-lg p-5 mb-5">
                <h2 className="text-2xl font-semibold mb-3">Order Items</h2>
                <table className="min-w-full table-auto">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="py-3 px-4">Product</th>
                            <th className="py-3 px-4">Quantity</th>
                            <th className="py-3 px-4">Price</th>
                            <th className="py-3 px-4">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items.map((item, index) => (
                            <tr key={index} className="border-t">
                                <td className="py-3 px-4">{item.productName}</td>
                                <td className="py-3 px-4">{item.quantity}</td>
                                <td className="py-3 px-4">${item.price.toFixed(2)}</td>
                                <td className="py-3 px-4">${(item.quantity * item.price).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    onClick={() => alert("Marking order as shipped...")}
                >
                    Mark as Shipped
                </button>
                <button
                    className="px-4 py-2 bg-red-600 text-white rounded-lg"
                    onClick={() => alert("Cancelling order...")}
                >
                    Cancel Order
                </button>
            </div>
        </div>
    );
};

export default OrderDetailsPage;
